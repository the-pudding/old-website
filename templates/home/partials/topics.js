const fse = require('fs-extra');
const d3 = require('d3');

const cwd = process.cwd();

const IGNORE = ['how to', 'awards'];
const Item = require(`${cwd}/templates/common/partials/item`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data, path }) {
  const stories = data
    .map(topic => {
      const storyItems = topic.value
        .map(story => `<li>${Item({ story, path })}</li>`)
        .join('');
      return `<ul data-topic='${topic.key}'>${storyItems}</ul>`;
    })
    .join('');

  const nav = data
    .map(
      topic =>
        `<li><button data-topic='${topic.key}'>${topic.key}</button></li>`
    )
    .join('');

  return `
		<div class='topics__nav'>
			<ul>${nav}</ul>
		</div>
		<div class='topics__stories'>
			${stories}
		</div>
	`;
}

module.exports = function({ path = '' }) {
  const filtered = storyData.filter(d => d.topic && !IGNORE.includes(d.topic));
  const data = d3
    .nest()
    .key(d => d.topic)
    .rollup(v => {
      d3.shuffle(v);
      return v.slice(0, 6);
    })
    .entries(filtered);
  const html = createHTML({ data, path });
  return html;
};

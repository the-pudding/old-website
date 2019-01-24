const fse = require('fs-extra');

const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);
const topicsData = require(`${cwd}/scripts/topics-data.js`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data }) {
  const stories = data
    .map(topic => {
      const storyItems = topic.values
        .map(story => `<li>${Item({ story, path: '../' })}</li>`)
        .join('');
      return `<ul data-topic='${topic.key}'>${storyItems}</ul>`;
    })
    .join('');

  const nav = topicsData
    .map(
      topic =>
        `<li><button data-topic='${topic.value}'>${topic.slug}</button></li>`
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

module.exports = function() {
  const data = topicsData.map(d => ({
    key: d.slug,
    values: storyData.filter(d => d.topic.includes(d.slug)).slice(0, 6)
  }));
  const html = createHTML({ data });
  return html;
};

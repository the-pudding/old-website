const fse = require('fs-extra');

const cwd = process.cwd();
const arrowSvg = `<svg class='random-stroke' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

const Item = require(`${cwd}/templates/common/partials/item`);
const topicsData = JSON.parse(
  fse.readFileSync(`${cwd}/scripts/topics-data.json`)
).filter(d => d.slug !== 'other');

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data, path }) {
  const stories = data
    .map(topic => {
      const storyItems = topic.values
        .map(story => `<li>${Item({ story, path })}</li>`)
        .join('');
      return `<ul data-topic='${topic.key}'>${storyItems}</ul>`;
    })
    .join('');

  const nav = topicsData
    .map(
      topic =>
        `<li><button data-topic='${topic.slug}'>${topic.label}</button></li>`
    )
    .join('');

  const more = topicsData
    .map(
      topic =>
        `<li data-topic='${topic.slug}'><a href='${path}/topics/#${
          topic.slug
        }'>More ${topic.label} ${arrowSvg}</a></li>`
    )
    .join('');

  return `
		<div class='topics__nav'>
			<ul>${nav}</ul>
		</div>
		<div class='topics__stories'>
			${stories}
		</div>
		<div class='topics__more'>
			<ul>${more}</ul>
		</div>
	`;
}

module.exports = function({ path = '' }) {
  const data = topicsData.map(d => ({
    key: d.slug,
    values: storyData.filter(v => v.topic.includes(d.slug)).slice(0, 6)
  }));

  const html = createHTML({ data, path });
  return html;
};

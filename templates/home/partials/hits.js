const d3 = require('d3');
const fse = require('fs-extra');

const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data, path }) {
  const storyItems = data
    .map(story => `<li>${Item({ story, path, hit: 'Most Something' })}</li>`)
    .join('');
  return storyItems;
}

module.exports = function({ path = '' }) {
  const data = storyData
    .sort((a, b) => d3.descending(a.views, b.views))
    .slice(0, 5);
  const html = createHTML({ data, path });
  return html;
};

const fse = require('fs-extra');

const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data, path }) {
  const storyItems = data
    .map(story => `<li>${Item({ story, path })}</li>`)
    .join('');
  return storyItems;
}

module.exports = function({ path = '' }) {
  const data = storyData.filter(d => d.pick);
  const html = createHTML({ data, path });
  return html;
};

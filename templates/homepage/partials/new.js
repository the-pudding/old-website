const fse = require('fs-extra');

const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML({ data, path }) {
  const storyItems = data.map(story => Item({ story, path })).join('');
  return storyItems;
}

module.exports = function({ path = '' }) {
  const data = storyData.filter(d => d.topic !== 'how to').slice(0, 3);
  const html = createHTML({ data, path });
  return html;
};

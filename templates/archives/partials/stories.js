const fse = require('fs-extra');

const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function createHTML() {
  return storyData
    .map(story => `<li>${Item({ story, path: '../' })}</li>`)
    .join('');
}

module.exports = function() {
  const html = createHTML();
  return html;
};

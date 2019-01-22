const fse = require('fs-extra');

const cwd = process.cwd();

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

module.exports = function getAuthor(story) {
  return story.author
    .map(d => {
      const { name, slug } = authorData.find(a => a.id === d);
      return `<a href='https://pudding.cool/author/${slug}'>${name}</a>`;
    })
    .join(', ');
};

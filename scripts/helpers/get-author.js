const fse = require('fs-extra');

const cwd = process.cwd();

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .replace(/\_/g, '-');
}

module.exports = function getAuthor(story) {
  return story.author
    .map(d => {
      const { name } = authorData.find(a => a.id === d);
      const slug = slugify(name);
      return `<a href='https://pudding.cool/author/${slug}'>${name}</a>`;
    })
    .join(', ');
};

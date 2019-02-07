const fse = require('fs-extra');

const cwd = process.cwd();

module.exports = function getAuthor(story) {
  const authorData = JSON.parse(
    fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
  );

  const all = story.author.map(d => {
    const { name, slug } = authorData.find(a => a.id === d);
    return {
      html: `<a href='https://pudding.cool/author/${slug}'>${name}</a>`,
      name,
      slug
    };
  });

  return {
    author_html: all.map(d => d.html).join(', '),
    author_name: all.map(d => d.name).join(', '),
    author_slug: all.map(d => d.slug).join(', ')
  };
};

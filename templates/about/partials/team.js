const fse = require('fs-extra');
const cwd = process.cwd();

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
).filter(d => d.position.toLowerCase().trim() === 'staff');

module.exports = function() {
  return authorData
    .map(d => {
      return `<a class="author" href="https://pudding.cool/author/${d.slug}">
			<div class='author__image' style="background-image:url('../common/assets/authors/${
        d.id
      }.jpg')"></div>
				<p class="author__name">${d.name}</p>
			</a>`;
    })
    .join('');
};

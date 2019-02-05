const fse = require('fs-extra');
const d3 = require('d3');
const cwd = process.cwd();

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
)
  .filter(d => d.position.toLowerCase().trim() === 'staff')
  .sort((a, b) => d3.ascending(a.name, b.name));

module.exports = function() {
  return authorData
    .map(d => {
      return `
				<li>
					<a class="author" href="https://pudding.cool/author/${d.slug}">
						<div class='author__img' style="background-image:url('../common/assets/authors/${
              d.id
            }.jpg')"></div>
						<p class="author__name">${d.name}</p>
					</a>
				</li>`;
    })
    .join('');
};

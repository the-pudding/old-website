const fse = require('fs-extra');
const d3 = require('d3');

const cwd = process.cwd();

const authorData = JSON.parse(
	fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
)
	.filter(d => {
		const pos = d.position.toLowerCase().trim()
		return pos !== 'staff' && pos
	})
	.sort((a, b) => d3.ascending(a.name, b.name));


module.exports = function () {
	return authorData
		.map(d => `
        <a class="author" href="https://pudding.cool/author/${d.slug}">${d.name}</a>`)
		.join(', ');
};
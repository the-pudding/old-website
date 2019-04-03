const fse = require('fs-extra');

const cwd = process.cwd();

const backlogData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/backlog.json`, 'utf-8')
);

const cols = [
	"date",
	"story",
	"involvement",
	"description",
	"seeking",
]

function createTD(d) {
	return cols.map(c => `<p class='idea--${c}'>${d[c]}</p>`).join('')
}

function createHTML() {
	return backlogData
		.filter(d => d.public === 'TRUE')
    .map(d => {
			const cl = d.seeking ? 'is-seeking' : '';
			return `<div class='idea ${cl}'>${createTD(d)}</div>`;
		})
		.join('');
}

module.exports = function() {
  const html = createHTML();
  return html;
};

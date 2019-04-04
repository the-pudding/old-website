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
	const seekingData = backlogData.filter(d => d.public === 'TRUE' && d.seeking)
	const regularData = backlogData.filter(d => d.public === 'TRUE' && !d.seeking)
	const seekingHTML = seekingData.map(d => `<div class='idea is-seeking'>${createTD(d)}</div>`)
	.join('');
	const regularHTML = regularData.map(d => `<div class='idea'>${createTD(d)}</div>`)
		.join('');
	
	return `
		<div class='ideas--seeking'>${seekingHTML}</div>
		<div class='ideas--regular'>${regularHTML}</div>
	`
}

module.exports = function() {
  const html = createHTML();
  return html;
};

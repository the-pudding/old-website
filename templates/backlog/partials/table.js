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
	return cols.map(c => {
    if (!d[c]) return false
    if (c === 'seeking' && d[c] === "TRUE") return false
    const pre = c === 'seeking' ? '<span>Looking for: </span>' : '<span></span>'
    const cl = c === 'involvement' ? `is-${d[c]}` : ''
    return `<p class='idea--${c} ${cl}'>${pre}${d[c]}</p>`
  }).filter(d => d).join('')
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

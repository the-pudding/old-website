const fse = require('fs-extra');
const cwd = process.cwd();

const copyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/privacy-copy.json`, 'utf-8')
).copy;

module.exports = function() {
  const li = arr => arr.map(d => `<li>${d.replace('\\:', ':')}</li>`).join('');

  const td = arr => arr.map(d => `<td>${d}</td>`).join('');

  const tr = arr => arr.map(d => `<tr>${td(d.td)}</tr>`).join('');

  return copyData
    .map(d => {
      if (d.type === 'hed') {
        return `<h3 id="${d.value.id}" class="section__hed random-color">${
          d.value.text
        }</h3>`;
      } else if (d.type === 'big') {
        return `<p class="section__big">${d.value}</p>`;
      } else if (d.type === 'ul') {
        return `
					<ul>
					${li(d.value.li)}
					</ul>
				`;
      } else if (d.type === 'table') {
        return `
				<p><strong>${d.value.title}</strong></p>
				<table class="section__table">
				<thead>
					<tr>${td(d.value.head)}</tr>
				</thead>
				<tbody>
				${tr(d.value.body)}
				</tbody>
				</table>`;
      }

      return `<p>${d.value.replace('\\:', '')}</p>`;
    })
    .join('');
};

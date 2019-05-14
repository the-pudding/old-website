const fse = require('fs-extra');

const cwd = process.cwd();
const arrowSvg = `<svg class='random-stroke' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

const topicsData = JSON.parse(fse.readFileSync(`${cwd}/scripts/topics-data.json`));

function createHTML({ path, exclude }) {
	const filteredData = topicsData.filter(d => !exclude.includes(d.slug));
  const nav = filteredData
    .map(
      topic =>
        `<span><button data-topic="${topic.slug}">${
          topic.label
        }</button></span>`
    )
    .join('');

  const more = filteredData
    .map(
      topic =>
        `<span data-topic="${topic.slug}"><a href='${path}topics/#${
          topic.slug
        }'>More ${topic.label} ${arrowSvg}</a></span>`
    )
    .join('');

  return `
		<div class='top__nav'>
			<div>${nav}</div>
		</div>
		<div class='top__more'>
			<div>${more}</div>
		</div>
	`;
}

module.exports = function({ path = '', exclude = ['how', 'other'] }) {
  const html = createHTML({ path, exclude });
  return html;
};

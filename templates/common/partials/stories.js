const fse = require('fs-extra');
const d3 = require('d3');

const cwd = process.cwd();
let filepath = null;

const Items = require(`${cwd}/templates/common/partials/items`);

const labels = {
  new: 'What’s New',
  greatest: 'Greatest Hits',
  all: 'All Essays',
  how: 'How-to'
};

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

authorData.sort((a, b) => {
  return d3.descending(a.position, b.position) || d3.ascending(a.name, b.name);
});

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

let storyDataWithAuthor = null;

const groupedData = {};

function getAuthor(story) {
  return story.author
    .map(d => {
      const { name, slug } = authorData.find(a => a.id === d);
      const path = filepath || '';
      return `<a href='${path}author/${slug}'>${name}</a>`;
      // return `<a>${name}</a>`;
    })
    .join(', ');
}

function groupData() {
  console.log('grouping data...');
  return new Promise((resolve, reject) => {
    const filtered = storyDataWithAuthor.filter(d => d.category !== 'how to');
    // what's new
    groupedData.new = filtered.slice(0, 3);
    // greatest hits
    groupedData.greatest = filtered
      .map(d => ({ ...d }))
      .sort((a, b) => d3.descending(a.views, b.views))
      .slice(0, 9);
    // all essays
    // groupedData.all = filtered.slice(3);
    groupedData.all = filtered;

    groupedData.how = storyDataWithAuthor.filter(d => d.category === 'how to');

    if (Object.keys(groupedData).length) resolve(groupData);
    else reject('no data');
  });
}

function createHTML() {
  const html = Object.keys(groupedData)
    .map(key => {
      const label = labels[key];
      let html = null;
      const views = key === 'greatest';
      const itemsHTML = Items({
        path: filepath,
        stories: groupedData[key],
        views
      });
      html = `
					<div class='essays__items'>
						${itemsHTML}
					</div>
				`;
      return `
			<section id='${key}' class='essays'>
				<h4 class='essays__hed tk-atlas'>${label}</h4>
				${html}
			</section>`;
    })
    .join('');

  return html;
}
module.exports = function({ path }) {
  filepath = path || '';

  storyDataWithAuthor = storyData.map(d => ({
    ...d,
    author_html: getAuthor(d)
  }));

  groupData();
  const html = createHTML();
  return html;
};

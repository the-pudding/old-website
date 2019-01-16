const fse = require('fs-extra');
const d3 = require('d3');
const replace = require('replace-in-file');

const cwd = process.cwd();

const Header = require(`${cwd}/templates/common/partials/header`);
const Content = require(`${cwd}/templates/about/partials/content`);
const Author = require(`${cwd}/templates/about/partials/author`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

const copyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/about-copy.json`, 'utf-8')
).copy;

function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .replace(/\_/g, '-');
}

function addSlug() {
  authorData.forEach(d => {
    d.slug = slugify(d.name);
  });
}

function cleanTemp(dir) {
  console.log('cleaning tmp folder...');
  return new Promise((resolve, reject) => {
    fse.remove(`${cwd}/.tmp/${dir}`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function copyHTMLTemplate() {
  console.log('copying html template file...');
  fse.ensureDirSync(`${cwd}/.tmp/about`);
  fse.copySync(
    `${cwd}/templates/about/index.template`,
    `${cwd}/.tmp/about/index.template`
  );
  return Promise.resolve();
}

function createMarkup() {
  console.log('creating markup...');

  const headerHTML = Header({ path: '../', storyData });

  const contentHTML = Content({ copyData });

  // add slug to author data
  addSlug();
  const teamHTML = Author({ authorData, filter: 'Staff' });

  const options = {
    files: `${cwd}/.tmp/about/index.template`,
    from: ['<!-- header -->', '<!-- content -->', '<!-- team -->'],
    to: [headerHTML, contentHTML, teamHTML]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyHTMLToSrc(files) {
  fse.copySync(files[0], `${cwd}/src/about/index.html`);
  return Promise.resolve();
}

function createHTML() {
  return new Promise((resolve, reject) => {
    copyHTMLTemplate()
      .then(createMarkup)
      .then(copyHTMLToSrc)
      .then(resolve)
      .catch(reject);
  });
}

function init() {
  cleanTemp('about')
    .then(createHTML)
    .then(() => {
      console.log('DONE: about.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

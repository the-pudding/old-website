const fse = require('fs-extra');
const d3 = require('d3');
const replace = require('replace-in-file');
const buble = require('buble');

const cwd = process.cwd();

const Header = require(`${cwd}/templates/common/partials/header`);
const Picks = require(`${cwd}/templates/homepage/partials/picks`);
const New = require(`${cwd}/templates/homepage/partials/new`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function cleanTemp(dir) {
  fse.ensureDirSync(`${cwd}/.tmp`);
  console.log('cleaning tmp folder...');
  return new Promise((resolve, reject) => {
    fse.remove(`.tmp/${dir}`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function copyHTMLTemplate() {
  console.log('copying html template file...');
  fse.ensureDirSync(`${cwd}/.tmp/homepage`);
  fse.copySync(
    `${cwd}/templates/homepage/index.template`,
    `${cwd}/.tmp/homepage/index.template`
  );
  return Promise.resolve();
}

function compileEntryJS() {
  const input = fse.readFileSync(
    `${cwd}/templates/homepage/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  return output.code;
}

function createMarkup() {
  console.log('creating markup...');

  const headerHTML = Header({});
  const picksHTML = Picks({});
  const newHTML = New({});
  const storyJS = JSON.stringify(storyData);
  const entryJS = compileEntryJS();

  const options = {
    files: `${cwd}/.tmp/homepage/index.template`,
    from: [
      '<!-- header -->',
      '<!-- picks -->',
      '<!-- new -->',
      '/* story-data */',
      '/* entry-js */'
    ],
    to: [headerHTML, picksHTML, newHTML, storyJS, entryJS]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyHTMLToSrc(files) {
  fse.copySync(files[0], `${cwd}/src/index.html`);
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
  cleanTemp('homepage')
    .then(createHTML)
    .then(() => {
      console.log('DONE: homepage.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

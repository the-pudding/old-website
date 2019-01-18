const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');
const buble = require('buble');

const cwd = process.cwd();

const Header = require(`${cwd}/templates/common/partials/header`);
const Picks = require(`${cwd}/templates/home/partials/picks`);
const New = require(`${cwd}/templates/home/partials/new`);
const Hits = require(`${cwd}/templates/home/partials/hits`);
const Topics = require(`${cwd}/templates/home/partials/topics`);
const How = require(`${cwd}/templates/home/partials/how`);
const Cta = require(`${cwd}/templates/common/partials/cta`);
const Footer = require(`${cwd}/templates/common/partials/footer`);

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
  fse.ensureDirSync(`${cwd}/.tmp/home`);
  fse.copySync(
    `${cwd}/templates/home/index.template`,
    `${cwd}/.tmp/home/index.template`
  );
  return Promise.resolve();
}

function compileEntryJS() {
  const input = fse.readFileSync(
    `${cwd}/templates/home/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  return output.code;
}

function createMarkup() {
  console.log('creating markup...');

  const headerHTML = Header();
  const picksHTML = Picks({});
  const newHTML = New({});
  const topicsHTML = Topics({});
  const ctaHTML = Cta();
  const hitsHTML = Hits({});
  const howHTML = How({});
  const footerHTML = Footer({});
  const storyJS = JSON.stringify(storyData);
  const entryJS = compileEntryJS();

  const options = {
    files: `${cwd}/.tmp/home/index.template`,
    from: [
      '<!-- header -->',
      '<!-- picks -->',
      '<!-- new -->',
      '<!-- topics -->',
      '<!-- cta -->',
      '<!-- hits -->',
      '<!-- how -->',
      '<!-- footer -->',
      '/* story-data */',
      '/* entry-js */'
    ],
    to: [
      headerHTML,
      picksHTML,
      newHTML,
      topicsHTML,
      ctaHTML,
      hitsHTML,
      howHTML,
      footerHTML,
      storyJS,
      entryJS
    ]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyHTMLToDev(files) {
  return new Promise((resolve, reject) => {
    const path = `${cwd}/.tmp/index.html`;
    fse.copySync(files[0], path);
    inlineSource(path, {
      compress: false,
      ignore: ['css', 'js']
    })
      .then(html => {
        fse.writeFileSync(`${cwd}/dev/index.html`, html);
        resolve();
      })
      .catch(reject);
  });
}

function createHTML() {
  return new Promise((resolve, reject) => {
    copyHTMLTemplate()
      .then(createMarkup)
      .then(copyHTMLToDev)
      .then(resolve)
      .catch(reject);
  });
}

function init() {
  cleanTemp('home')
    .then(createHTML)
    .then(() => {
      console.log('DONE: home.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');
const buble = require('buble');

const cwd = process.cwd();

const Meta = require(`${cwd}/templates/common/partials/meta`);
const Analytics = require(`${cwd}/templates/common/partials/analytics`);
const Header = require(`${cwd}/templates/common/partials/header`);
const Footer = require(`${cwd}/templates/common/partials/footer`);
const TopicsNav = require(`${cwd}/templates/common/partials/topics-nav`);
const Content = require(`${cwd}/templates/topics/partials/content`);

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
  fse.ensureDirSync(`${cwd}/.tmp/topics`);
  fse.copySync(
    `${cwd}/templates/topics/index.template`,
    `${cwd}/.tmp/topics/index.template`
  );
  return Promise.resolve();
}

function compileEntryJS() {
  const input = fse.readFileSync(
    `${cwd}/templates/topics/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  return output.code;
}

function createMarkup() {
  console.log('creating markup...');

  const metaHTML = Meta({ title: 'Topics' });
  const analyticsHTML = Analytics();
  const headerHTML = Header('../');
  const topicsNavHTML = TopicsNav({ path: '../', exclude: ['other'] });
  const contentHTML = Content();
  const footerHTML = Footer();
  const entryJS = compileEntryJS();

  const options = {
    files: `${cwd}/.tmp/topics/index.template`,
    from: [
      '<!-- meta -->',
      '<!-- analytics -->',
      '<!-- header -->',
      '<!-- topics-nav -->',
      '<!-- content -->',
      '<!-- footer -->',
      '/* entry-js */'
    ],
    to: [
      metaHTML,
      analyticsHTML,
      headerHTML,
      topicsNavHTML,
      contentHTML,
      footerHTML,
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
    const path = `${cwd}/.tmp/topics/index.html`;
    fse.copySync(files[0], path);
    inlineSource(path, {
      compress: false,
      ignore: ['css', 'js']
    })
      .then(html => {
        fse.ensureDirSync(`${cwd}/dev/topics`);
        fse.writeFileSync(`${cwd}/dev/topics/index.html`, html);
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
  cleanTemp('topics')
    .then(createHTML)
    .then(() => {
      console.log('DONE: topics.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

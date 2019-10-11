const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');
const buble = require('buble');

const cwd = process.cwd();

const Meta = require(`${cwd}/templates/common/partials/meta`);
const Analytics = require(`${cwd}/templates/common/partials/analytics`);
const Header = require(`${cwd}/templates/common/partials/header`);
const Footer = require(`${cwd}/templates/common/partials/footer`);
const Table = require(`${cwd}/templates/backlog/partials/table`);

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
  fse.ensureDirSync(`${cwd}/.tmp/backlog`);
  fse.copySync(
    `${cwd}/templates/backlog/index.template`,
    `${cwd}/.tmp/backlog/index.template`
  );
  return Promise.resolve();
}

// function compileEntryJS() {
//   const input = fse.readFileSync(
//     `${cwd}/templates/backlog/entry.template.js`,
//     'utf-8'
//   );
//   const output = buble.transform(input);
//   return output.code;
// }

function createMarkup() {
  console.log('creating markup...');

  const metaHTML = Meta({ title: 'Backlog' });
  const analyticsHTML = Analytics();
  const headerHTML = Header('../');
  const tableHTML = Table();
  const footerHTML = Footer();
  // const entryJS = compileEntryJS();

  const options = {
    files: `${cwd}/.tmp/backlog/index.template`,
    from: [
      '<!-- meta -->',
      '<!-- analytics -->',
      '<!-- header -->',
      '<!-- table -->',
      '<!-- footer -->',
      // '/* entry.js */'
    ],
    to: [
      metaHTML,
      analyticsHTML,
      headerHTML,
      tableHTML,
      footerHTML,
      // entryJS
    ],
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyHTMLToDev(files) {
  return new Promise((resolve, reject) => {
    const path = `${cwd}/.tmp/backlog/index.html`;
    fse.copySync(files[0].file, path);
    inlineSource(path, {
      compress: false,
      ignore: ['css', 'js'],
    })
      .then(html => {
        fse.ensureDirSync(`${cwd}/dev/backlog`);
        fse.writeFileSync(`${cwd}/dev/backlog/index.html`, html);
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
  cleanTemp('backlog')
    .then(createHTML)
    .then(() => {
      console.log('DONE: backlog.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

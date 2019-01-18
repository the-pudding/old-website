const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');

const cwd = process.cwd();

const Header = require(`${cwd}/templates/common/partials/header`);
const Footer = require(`${cwd}/templates/common/partials/footer`);
const Content = require(`${cwd}/templates/archive/partials/content`);
const Team = require(`${cwd}/templates/archive/partials/team`);

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
  fse.ensureDirSync(`${cwd}/.tmp/archive`);
  fse.copySync(
    `${cwd}/templates/archive/index.template`,
    `${cwd}/.tmp/archive/index.template`
  );
  return Promise.resolve();
}

function createMarkup() {
  console.log('creating markup...');

  const headerHTML = Header();
  const contentHTML = Content();
  const teamHTML = Team();
  const footerHTML = Footer();

  const options = {
    files: `${cwd}/.tmp/archive/index.template`,
    from: [
      '<!-- header -->',
      '<!-- content -->',
      '<!-- team -->',
      '<!-- footer -->'
    ],
    to: [headerHTML, contentHTML, teamHTML, footerHTML]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyHTMLToDev(files) {
  return new Promise((resolve, reject) => {
    const path = `${cwd}/.tmp/archive/index.html`;
    fse.copySync(files[0], path);
    inlineSource(path, {
      compress: false,
      ignore: ['css', 'js']
    })
      .then(html => {
        fse.ensureDirSync(`${cwd}/dev/archives`);
        fse.writeFileSync(`${cwd}/dev/archive/index.html`, html);
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
  cleanTemp('archive')
    .then(createHTML)
    .then(() => {
      console.log('DONE: archive.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

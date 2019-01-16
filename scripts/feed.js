const fse = require('fs-extra');
const d3 = require('d3');
const replace = require('replace-in-file');

const cwd = process.cwd();

const Items = require(`${cwd}/templates/feed/partials/items`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

function cleanTemp(dir) {
  console.log('cleaning tmp folder...');
  return new Promise((resolve, reject) => {
    fse.remove(`${cwd}.tmp/${dir}`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function copyXMLTemplate() {
  fse.ensureDirSync(`${cwd}/.tmp/feed`);
  console.log('copying xml template file...');
  fse.copySync(
    `${cwd}/templates/feed/index.template`,
    `${cwd}/.tmp/feed/index.template`
  );
  return Promise.resolve();
}

function createMarkup() {
  console.log('creating markup...');

  const filtered = storyData.slice(0, 15);

  const itemsXML = Items(filtered);

  const options = {
    files: `${cwd}/.tmp/feed/index.template`,
    from: ['<!-- items -->', '<!-- lastBuildDate -->'],
    to: [itemsXML, new Date().toUTCString()]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyFeedToSrc(files) {
  fse.copySync(files[0], `${cwd}/src/feed/index.xml`);
  return Promise.resolve();
}

function createXML() {
  return new Promise((resolve, reject) => {
    copyXMLTemplate()
      .then(createMarkup)
      .then(copyFeedToSrc)
      .then(resolve)
      .catch(reject);
  });
}

function init() {
  cleanTemp('feed')
    .then(createXML)
    .then(() => {
      console.log('DONE: feed.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

const fse = require('fs-extra');
const replace = require('replace-in-file');
const buble = require('buble');
var cleanCSS = require('clean-css');

const cwd = process.cwd();

const inputCSS = fse.readFileSync(
  `${cwd}/templates/footer/partials/style.css`,
  'utf-8'
);

const outputCSS = new cleanCSS({}).minify(inputCSS);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

const collectionData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/collections.json`, 'utf-8')
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

function cleanStories(data) {
  return data
    .filter(d => d.footer)
    .map(d => ({
      url: d.url.trim(),
      hed: d.hed.replace(/'/g, '’').trim(),
      category: d.category.trim()
    }))
    .reverse();
}

function compileJS() {
  console.log('compiling js...');
  const input = fse.readFileSync(
    `${cwd}/templates/footer/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  fse.ensureDirSync(`${cwd}/.tmp/footer`);
  fse.writeFileSync(`${cwd}/.tmp/footer/entry.js`, output.code);

  const collectionJS = JSON.stringify(collectionData);
  const storyJS = JSON.stringify(cleanStories(storyData));

  const options = {
    files: `${cwd}/.tmp/footer/entry.js`,
    from: ['*style-data*', '*recirc-data*'],
    to: [outputCSS.styles, storyJS]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function copyToDev() {
  fse.ensureDirSync('dev/footer');
  fse.copySync(
    `${cwd}/.tmp/footer/entry.js`,
    `${cwd}/dev/footer/pudding-footer.js`
  );
  return Promise.resolve();
}

function init() {
  cleanTemp('footer')
    .then(compileJS)
    .then(copyToDev)
    .then(() => {
      console.log('DONE: footer.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

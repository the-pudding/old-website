const fse = require('fs-extra');
const replace = require('replace-in-file');
const buble = require('buble');
const cleanCSS = require('clean-css');

const cwd = process.cwd();

const inputCSS = fse.readFileSync(
  `${cwd}/templates/footer/partials/style.css`,
  'utf-8'
);

const outputCSS = new cleanCSS({}).minify(inputCSS);

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

function prepareStories() {
  const data = storyData
    .filter(d => d.footer)
    .map(d => ({
      image: d.image,
      url: d.url.trim(),
      hed: d.hed.replace(/'/g, '’').trim()
    }));

  const output = JSON.stringify(data);
  fse.ensureDirSync(`${cwd}/dev/footer`);
  fse.writeFileSync(`${cwd}/dev/footer/stories.json`, output);
  return Promise.resolve();
}

function compileJS1() {
  console.log('compiling js v1...');
  const input = fse.readFileSync(
    `${cwd}/templates/footer/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  fse.ensureDirSync(`${cwd}/.tmp/footer`);
  fse.writeFileSync(`${cwd}/.tmp/footer/entry.js`, output.code);

  const options = {
    files: `${cwd}/.tmp/footer/entry.js`,
    from: ['*style-data*'],
    to: [outputCSS.styles]
  };

  return new Promise((resolve, reject) => {
    replace(options)
      .then(resolve)
      .catch(reject);
  });
}

function compileJS2() {
  console.log('compiling js v2...');
  const input = fse.readFileSync(
    `${cwd}/templates/footer/entry.v2.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  fse.ensureDirSync(`${cwd}/.tmp/footer`);
  fse.writeFileSync(`${cwd}/.tmp/footer/entry.v2.js`, output.code);

  return Promise.resolve();
}

function copyToDev() {
  fse.ensureDirSync('dev/footer');
  fse.copySync(
    `${cwd}/.tmp/footer/entry.js`,
    `${cwd}/dev/footer/pudding-footer.js`
  );
  fse.copySync(
    `${cwd}/.tmp/footer/entry.v2.js`,
    `${cwd}/dev/footer/pudding-footer.v2.js`
  );
  return Promise.resolve();
}

function init() {
  cleanTemp('footer')
    .then(prepareStories)
    .then(compileJS1)
    .then(compileJS2)
    .then(copyToDev)
    .then(() => {
      console.log('DONE: footer.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

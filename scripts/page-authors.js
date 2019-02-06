const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');

const cwd = process.cwd();

const Meta = require(`${cwd}/templates/common/partials/meta`);
const Analytics = require(`${cwd}/templates/common/partials/analytics`);
const Header = require(`${cwd}/templates/common/partials/header`);
const Bio = require(`${cwd}/templates/author/partials/bio`);
const Stories = require(`${cwd}/templates/author/partials/stories`);
const Footer = require(`${cwd}/templates/common/partials/footer`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

function cleanTemp(dir) {
  console.log('cleaning tmp folder...');
  return new Promise((resolve, reject) => {
    fse.remove(`${cwd}/.tmp/${dir}`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function addStories() {
  authorData.forEach(d => {
    d.stories = storyData.filter(s => s.author.includes(d.id));
  });
}

function copyHTMLTemplate() {
  fse.ensureDirSync(`${cwd}/.tmp/author`);
  console.log('copying html template file...');
  // create a dir for each of them
  authorData.forEach(d => {
    const from = `${cwd}/templates/author/index.template`;
    const to = `${cwd}/.tmp/author/${d.slug}/index.template`;
    fse.copySync(from, to);
  });
  return Promise.resolve();
}

function createMarkup() {
  console.log('creating markup...');

  const promises = authorData.map(d => {
    return new Promise((resolve, reject) => {
      const metaHTML = Meta({
        title: d.name,
        description: `Read more from ${d.name}} on The Pudding.`
      });
      const analyticsHTML = Analytics();
      const headerHTML = Header('../../');
      const bioHTML = Bio(d);
      const storiesHTML = Stories(d.stories);
      const footerHTML = Footer();

      const options = {
        files: `${cwd}/.tmp/author/${d.slug}/index.template`,
        from: [
          '<!-- meta -->',
          '<!-- analytics -->',
          '<!-- header -->',
          '<!-- bio -->',
          '<!-- stories -->',
          '<!-- footer -->'
        ],
        to: [
          metaHTML,
          analyticsHTML,
          headerHTML,
          bioHTML,
          storiesHTML,
          footerHTML
        ]
      };

      replace(options)
        .then(resolve)
        .catch(reject);
    });
  });

  return Promise.all(promises);
}

function copyHTMLToDev(files) {
  const promises = files.map(d => {
    return new Promise((res, rej) => {
      const path = d[0].replace('.template', '.html');
      fse.copySync(d[0], path);

      inlineSource(path, {
        compress: false,
        ignore: ['css', 'js']
      })
        .then(html => {
          const slug = d[0]
            .replace('/index.template', '')
            .split('/')
            .pop();
          fse.ensureDirSync(`${cwd}/dev/author/${slug}`);
          fse.writeFileSync(`${cwd}/dev/author/${slug}/index.html`, html);
          res();
        })
        .catch(rej);
    });
  });

  return Promise.all(promises);
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
  fse.ensureDirSync(`${cwd}/.tmp`);
  cleanTemp('author')
    .then(addStories)
    .then(createHTML)
    .then(() => {
      console.log('DONE: author.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

const fse = require('fs-extra');
const d3 = require('d3');
const replace = require('replace-in-file');
const buble = require('buble');

const cwd = process.cwd();

const Meta = require(`${cwd}/templates/author/partials/meta`);
const Header = require(`${cwd}/templates/common/partials/header`);
const Person = require(`${cwd}/templates/author/partials/person`);
const Stories = require(`${cwd}/templates/common/partials/stories`);
const StoriesAuthor = require(`${cwd}/templates/author/partials/stories`);
const Authors = require(`${cwd}/templates/common/partials/authors`);

const storyData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/stories.json`, 'utf-8')
);

const authorData = JSON.parse(
  fse.readFileSync(`${cwd}/.tmp/data/authors.json`, 'utf-8')
);

function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .replace(/\_/g, '-');
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

function addSlug() {
  authorData.forEach(d => {
    d.slug = slugify(d.name);
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

function compileEntryJS() {
  const input = fse.readFileSync(
    `${cwd}/templates/author/entry.template.js`,
    'utf-8'
  );
  const output = buble.transform(input);
  return output.code;
}

function createMarkup() {
  console.log('creating markup...');

  const replacePromises = authorData.map(d => {
    return new Promise((resolve, reject) => {
      const metaHTML = Meta(d);
      const headerHTML = Header({ path: '../../', storyData });
      const personHTML = Person(d);
      const storiesHTML = Stories({ path: '../../' });
      const storiesByAuthorHTML = StoriesAuthor(d.stories);
      const authorHTML = Authors(authorData);
      const entryJS = compileEntryJS();

      const options = {
        files: `${cwd}/.tmp/author/${d.slug}/index.template`,
        from: [
          '<!-- meta -->',
          '<!-- header -->',
          '<!-- person -->',
          '<!-- authors -->',
          '<!-- stories -->',
          '<!-- stories-by-author -->',
          '/* entry-js */'
        ],
        to: [
          metaHTML,
          headerHTML,
          personHTML,
          authorHTML,
          storiesHTML,
          storiesByAuthorHTML,
          entryJS
        ]
      };

      replace(options)
        .then(resolve)
        .catch(reject);
    });
  });

  return Promise.all(replacePromises);
}

function copyHTMLToSrc(files) {
  files.forEach(d => {
    const to = d[0].replace('.tmp', 'src').replace('.template', '.html');
    fse.copySync(d[0], to);
  });

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
  fse.ensureDirSync(`${cwd}/.tmp`);
  cleanTemp('author')
    .then(addSlug)
    .then(addStories)
    .then(createHTML)
    .then(() => {
      console.log('DONE: author.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

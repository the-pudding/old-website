const fse = require('fs-extra');
const uglify = require('uglify-js');
const { inlineSource } = require('inline-source');

const cwd = process.cwd();

function inlineAssets(rootpath) {
  const path = `${cwd}/dist/${rootpath}index.html`;
  inlineSource(path, {
    compress: false,
    rootpath: `dist/${rootpath}`
  }).then(html => {
    fse.writeFileSync(path, html);
  });
}

function footer() {
  fse.copySync(
    `${cwd}/dev/footer/stories.json`,
    `${cwd}/dist/footer/stories.json`
  );

  const input = fse.readFileSync(
    `${cwd}/dist/footer/pudding-footer.js`,
    'utf-8'
  );
  const output = uglify.minify(input);
  fse.writeFileSync(`${cwd}/dist/footer/pudding-footer.js`, output.code);

  const input2 = fse.readFileSync(
    `${cwd}/dist/footer/pudding-footer.v2.js`,
    'utf-8'
  );
  const output2 = uglify.minify(input2);
  fse.writeFileSync(`${cwd}/dist/footer/pudding-footer.v2.js`, output2.code);
}

function init() {
  fse.copySync(`${cwd}/dev`, `${cwd}/dist`);
  // homepage
  inlineAssets('');
  // about
  inlineAssets('about/');
  // topics
  inlineAssets('topics/');
  // archives
  inlineAssets('archives/');
  // authors
  const authors = fse
    .readdirSync(`${cwd}/dist/author`)
    .filter(d => d.match(/\W/) && d.includes('.html'));
  authors.forEach(d => inlineAssets(`author/${d}/`));
  // footer
  footer();
}

init();

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

function minifyFooter() {
  const input = fse.readFileSync(
    `${cwd}/dist/footer/pudding-footer.js`,
    'utf-8'
  );
  const output = uglify.minify(input);
  fse.writeFileSync(`${cwd}/dist/footer/pudding-footer.js`, output.code);
}

function init() {
  fse.copySync(`${cwd}/dev`, `${cwd}/dist`);
  // homepage
  inlineAssets('');
  // about
  // inlineAssets('about/');
  // // author pages
  // const authors = fse
  //   .readdirSync(`${cwd}/dist/author`)
  //   .filter(d => d.match(/\W/) && d.includes('.html'));
  // authors.forEach(d => inlineAssets(`author/${d}/`));

  // minify footer
  minifyFooter();
}

init();

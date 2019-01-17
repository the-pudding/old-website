const fse = require('fs-extra');
const minify = require('html-minifier').minify;
const uglify = require('uglify-js');
const inline = require('inline-source').sync;

const cwd = process.cwd();

function inlineAssets(rootpath) {
  const path = `${cwd}/dist/${rootpath}index.html`;
  const html = inline(path, {
    compress: false,
    rootpath: `dist/${rootpath}`
  });

  const htmlMin = minify(html, {
    minifyCSS: true,
    minifyJS: false
  });

  fse.writeFileSync(path, htmlMin);
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
  inlineAssets('about/');
  // author pages
  const authors = fse
    .readdirSync(`${cwd}/dist/author`)
    .filter(d => d.match(/\W/));
  authors.forEach(d => inlineAssets(`author/${d}/`));

  // minify footer
  minifyFooter();
}

init();

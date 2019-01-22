const fse = require('fs-extra');
const Jimp = require('jimp');

const cwd = process.cwd();
const inpath = `${cwd}/thumbnails`;
const outpath = `${cwd}/dev/common/assets/thumbnails`;

const sizes = [1920, 1280, 640];

function getFilesToProcess() {
  const dest = `${outpath}/${sizes[0]}`;

  const inputFiles = fse.readdirSync(inpath).filter(d => d.includes('.jpg'));
  const outFiles = fse.readdirSync(dest).filter(d => d.includes('.jpg'));

  return inputFiles.filter(d => !outFiles.includes(d));
}

function resize({ file, size }) {
  console.log(`resizing ${file} - ${size}...`);
  return new Promise((resolve, reject) => {
    Jimp.read(`${inpath}/${file}`)
      .then(img => {
        return img
          .resize(size, Jimp.AUTO)
          .quality(70)
          .write(`${outpath}/${size}/${file}`, resolve);
      })
      .catch(reject);
  });
}

function processFile(file) {
  return new Promise((resolve, reject) => {
    const promises = sizes.map(size => resize({ file, size }));

    Promise.all(promises)
      .then(resolve)
      .catch(reject);
  });
}

function init() {
  console.log('resizing thumbnails...');
  sizes.forEach(s =>
    fse.ensureDirSync(`${cwd}/dev/common/assets/thumbnails/${s}`)
  );

  const queue = getFilesToProcess();

  let index = 0;

  const next = () => {
    processFile(queue[index])
      .then(() => {
        index += 1;
        if (index < queue.length) next();
        else {
          console.log('DONE: resize-thumbnails.js');
          process.exit();
        }
      })
      .catch(console.error);
  };

  if (queue.length) next();
  else {
    console.log('no new thumbnails to resize...');
    console.log('DONE: resize-thumbnails.js');
  }
}

init();

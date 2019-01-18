const fse = require('fs-extra');
const Jimp = require('jimp');

const ORIG = 1920;
const sizes = [1280, 640];

function getFilesToProcess() {
  const src = `${cwd}/dev/common/assets/thumbnails/${ORIG}`;
  const dest = `${cwd}/dev/common/assets/thumbnails/${sizes[0]}`;

  const inputFiles = fse.readdirSync(src).filter(d => d.includes('.jpg'));
  const outFiles = fse.readdirSync(dest).filter(d => d.includes('.jpg'));

  return inputFiles.filter(d => !outFiles.includes(d));
}

function resize({ path, size }) {
  return new Promise((resolve, reject) => {
    const output = path.replace(ORIG, size);
    Jimp.read(path)
      .then(img => {
        return img.resize(size).write(output, resolve);
      })
      .catch(reject);
  });
}

function processFile(file) {
  return new Promise((resolve, reject) => {
    const path = `${cwd}/dev/common/assets/thumbnails/${ORIG}/${file}`;
    const promises = sizes.forEach(s => resize({ path, size: sizes[0] }));

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
          process.exit();
          console.log('DONE: resize-thumbnails.js');
        }
      })
      .catch(console.error);
  };

  next();
}

const puppeteer = require('puppeteer');
const d3 = require('d3');
const shell = require('shelljs');
const fse = require('fs-extra');

const cwd = process.cwd();

const storyData = JSON.parse(
  fse.readFileSync('.tmp/data/stories.json', 'utf-8')
);

const cached = fse
  .readdirSync(`${cwd}/src/common/assets/previews`)
  .filter(d => d.includes('.mp4'));

const WIDTH = 1200;
const HEIGHT = 600;
const INC = HEIGHT * 0.33;
const DELAY = 5000;

async function scrollAndSnap({ page, d, index, prev }) {
  const y = await page.evaluate(() => window.pageYOffset);
  const paddedIndex = d3.format('0>3')(index);
  console.log(`${d.filename}/${paddedIndex}`);
  if (y !== prev) {
    prev = y;

    await page.screenshot({
      path: `.tmp/preview/${d.filename}/${paddedIndex}.png`
    });

    await page.evaluate(`window.scrollTo(0, ${y + INC})`);

    index += 1;
    return { index, prev, done: false };
  }
  return { done: true };
}

async function removeFooter(d) {
  fse
    .readdirSync(`${cwd}/.tmp/preview/${d.filename}`)
    .filter(f => f.includes('.png'))
    .sort(d3.descending)
    .slice(0, 4)
    .forEach(f => fse.removeSync(`${cwd}/.tmp/preview/${d.filename}/${f}`));

  return true;
}

async function record({ browser, page, d, index = 0, prev = -1 }) {
  fse.ensureDirSync(`${cwd}/.tmp/preview/${d.filename}`);
  try {
    const result = await scrollAndSnap({
      page,
      d,
      index,
      prev
    });
    if (result.done) {
      await browser.close();
      if (index > 1) await removeFooter(d);
      return true;
    } else {
      record({ browser, page, d, index: result.index, prev: result.prev });
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function setup(d) {
  const base = 'https://pudding.cool';
  const url = `${base}/${d.url}`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 600 });
  await page.goto(url);
  await page.waitFor(DELAY);
  return { browser, page };
}

async function createVideo(d) {
  try {
    const { browser, page } = await setup(d);
    await record({ browser, page, d });
    return true;
  } catch (err) {
    return err;
  }
}

function init() {
  shell.exec(`rm -rf ${cwd}/.tmp/preview/*`);
  fse.ensureDirSync(`${cwd}/.tmp/preview`);

  const withFilename = storyData.map(d => ({
    url: d.url,
    filename: `${d.url.replace(/\//g, '_')}`
  }));

  const filtered = withFilename.filter(
    d => !cached.includes(`${d.filename}.mp4`)
  );

  let i = 0;
  const next = async () => {
    await createVideo(filtered[i]);
    i++;
    if (i < filtered.length) next();
  };
  next();
}

init();

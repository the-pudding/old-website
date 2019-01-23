const fse = require('fs-extra');
const request = require('request');
const d3 = require('d3');

const cwd = process.cwd();

const getAuthor = require(`${cwd}/scripts/helpers/get-author.js`);

const url = {
  base: 'https://docs.google.com/spreadsheets/d',
  param: 'export?format=csv&gid=',
  doc: '157mDBFAmsOdkO9f7RgUSgrQm1dzrpB9V3nN5-cEIQN0',
  stories: '0',
  pudding: '1653329592',
  polygraph: '1937679755',
  authors: '1258453125'
};

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

function fetchAnalytics() {
  console.log('fetching analytics...');

  const urlPudding = `${url.base}/${url.doc}/${url.param}${url.pudding}`;
  const urlPolygraph = `${url.base}/${url.doc}/${url.param}${url.polygraph}`;

  const promisePudding = new Promise((resolve, reject) => {
    request(urlPudding, (error, response, body) => {
      if (!error && response.statusCode == 200) resolve(body);
      else reject(error);
    });
  });

  const promisePolygraph = new Promise((resolve, reject) => {
    request(urlPolygraph, (error, response, body) => {
      if (!error && response.statusCode == 200) resolve(body);
      else reject(error);
    });
  });

  return new Promise((resolve, reject) => {
    Promise.all([promisePudding, promisePolygraph])
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function fetchStories(analytics) {
  console.log('fetching stories google sheet...');
  const urlStory = `${url.base}/${url.doc}/${url.param}${url.stories}`;
  return new Promise((resolve, reject) => {
    request(urlStory, (error, response, body) => {
      if (!error && response.statusCode == 200)
        resolve({ analytics, stories: body });
      else reject(error);
    });
  });
}

function joinStoryData({ analytics, stories }) {
  console.log('loading data...');
  return new Promise((resolve, reject) => {
    const analyticsData = {
      pudding: d3.csvParse(analytics[0]),
      polygraph: d3.csvParse(analytics[1])
    };

    const data = d3.csvParse(stories);
    // merge the two
    data.forEach(d => {
      // find match in analytics
      const key = d.views_key;
      const matchPudding = analyticsData.pudding.filter(
        a => a.Pudding.toLowerCase().trim() === key.toLocaleLowerCase().trim()
      );
      const matchPolygraph = analyticsData.polygraph.filter(
        a => a.Polygraph.toLowerCase().trim() === key.toLocaleLowerCase().trim()
      );

      const sumPudding = d3.sum(matchPudding, a => +a['']);
      const sumPolygraph = d3.sum(matchPolygraph, a => +a['']);

      // views
      d.views = sumPudding + sumPolygraph;
      d.views_display = d3.format('.2s')(d.views);

      // add img
      d.img = d.url.toLowerCase().replace(/\//g, '_');

      // time
      // d.time = +d.date.slice(-4) < 2017 ? 'Internet old' : moment(d.date, 'MM/DD/YYYY').fromNow()
      // d.time = d.time.includes('hours') ? 'Today' : d.time
      d.date = d3.timeParse('%m/%d/%Y')(d.date);
      d.time = d3.timeFormat('%B %Y')(d.date);

      // authors
      d.author = d.author.split(',').map(a => a.trim());

      // clean topic
      d.topic = d.topic.toLowerCase().trim();
    });

    data.reverse();

    if (data) resolve(data);
    else reject('no data');
  });
}

function authorStoryData(data) {
  return data.map(d => ({
    ...d,
    ...getAuthor(d)
  }));
}

function writeStoryData(data) {
  console.log('writing story data to file...');
  const dir = `${cwd}/.tmp/data`;
  fse.ensureDirSync(dir);
  const json = JSON.stringify(data, null, 2);
  fse.writeFileSync(`${dir}/stories.json`, json);
  return Promise.resolve();
}

function initStoryData() {
  return new Promise((resolve, reject) => {
    fetchAnalytics()
      .then(fetchStories)
      .then(joinStoryData)
      .then(authorStoryData)
      .then(writeStoryData)
      .then(resolve)
      .catch(reject);
  });
}

function fetchAuthors() {
  console.log('fetching authors google sheet...');
  const urlStory = `${url.base}/${url.doc}/${url.param}${url.authors}`;
  return new Promise((resolve, reject) => {
    request(urlStory, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const data = d3.csvParse(body);
        resolve(data);
      } else reject(error);
    });
  });
}

function slugAuthors(data) {
  const withSlug = data.map(d => ({
    ...d,
    slug: slugify(d.name)
  }));
  return Promise.resolve(withSlug);
}

function writeAuthorData(data) {
  console.log('writing author data to file...');
  const dir = `${cwd}/.tmp/data`;
  fse.ensureDirSync(dir);
  const json = JSON.stringify(data, null, 2);
  fse.writeFileSync(`${dir}/authors.json`, json);
  return Promise.resolve();
}

function initAuthorData() {
  return new Promise((resolve, reject) => {
    fetchAuthors()
      .then(slugAuthors)
      .then(writeAuthorData)
      .then(resolve)
      .catch(reject);
  });
}

function init() {
  // make sure there is a .tmp dir
  fse.ensureDirSync(`${cwd}/.tmp`);
  cleanTemp('data')
    .then(initAuthorData)
    .then(initStoryData)
    .then(() => {
      console.log('DONE: fetch-data.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

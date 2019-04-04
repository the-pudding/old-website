const fse = require('fs-extra');
const request = require('request');
const d3 = require('d3');

const cwd = process.cwd();

const getAuthor = require(`${cwd}/scripts/get-author.js`);

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

function arrayify(str) {
  return str.split(',').map(d => d.trim());
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
    const sanitized = data
      .filter(d => !d.ignore)
      .map(d => {
        // find match in analytics
        const key = d.views_key;
        const matchPudding = analyticsData.pudding.filter(
          a => a.Pudding.toLowerCase().trim() === key.toLocaleLowerCase().trim()
        );
        const matchPolygraph = analyticsData.polygraph.filter(
          a =>
            a.Polygraph.toLowerCase().trim() === key.toLocaleLowerCase().trim()
        );

        const sumPudding = d3.sum(matchPudding, a => +a['']);
        const sumPolygraph = d3.sum(matchPolygraph, a => +a['']);

        const date = d3.timeParse('%m/%d/%Y')(d.date);
        return {
          ...d,
          date,
          views: sumPudding + sumPolygraph,
          img: d.url.toLowerCase().replace(/\//g, '_'),
          time: d3.timeFormat('%B %Y')(date),
          author: arrayify(d.author),
          topic: arrayify(d.topic),
          chart: arrayify(d.chart),
          keyword: arrayify(d.keyword)
        };
      });

    sanitized.reverse();

    if (sanitized) resolve(sanitized);
    else reject('no data');
  });
}

function authorStoryData(data) {
  return data.map(d => ({
    ...d,
    ...getAuthor(d)
  }));
}

function imageStoryData(data) {
  const getImage = d => {
    try {
      if (fse.statSync(`${cwd}/dev/common/assets/thumbnails/1920/${d.img}.jpg`))
        return d.img;
    } catch (err) {
      return d.topic[0];
    }
  };

  return data.map(d => ({
    ...d,
    image: getImage(d)
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
      .then(imageStoryData)
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

function initBacklogData() {
	console.log('fetching backlog...');
	
	const dir = `${cwd}/.tmp/data`;
	fse.ensureDirSync(dir);

	const urlBacklog = {
		base: 'https://docs.google.com/spreadsheets/d',
		param: 'export?format=csv&gid=',
		doc: '1uXY_VFKbiZGXPgX0xclOyWvmRRCB-kYhIgRwhixwxHw',
		stories: '0',
	};

	const urlB = `${urlBacklog.base}/${urlBacklog.doc}/${urlBacklog.param}${urlBacklog.stories}`;
	return new Promise((resolve, reject) => {
		request(urlB, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				const data = d3.csvParse(body);
				const json = JSON.stringify(data, null, 2);
				fse.writeFileSync(`${dir}/backlog.json`, json);
				resolve();
			}
			else reject(error);
		});
	});
}

function init() {
  // make sure there is a .tmp dir
  fse.ensureDirSync(`${cwd}/.tmp`);
  cleanTemp('data')
    .then(initAuthorData)
		.then(initStoryData)
		.then(initBacklogData)
    .then(() => {
      console.log('DONE: fetch-data.js');
      process.exit();
    })
    .catch(err => console.log(err));
}

init();

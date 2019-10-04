const archieml = require('archieml');
const request = require('request');
const fs = require('fs');

const cwd = process.cwd();

console.log('fetching faq page copy...');

const google = {
	id: '1V1_jCgo2oWYo5Xqa8Kj1nmipVssW_1dRl3N6pnBaY3U',
	filename: 'faq-copy'
};

const url = `https://docs.google.com/document/d/${google.id}/export?format=txt`;

request(url, (error, response, body) => {
  const parsed = archieml.load(body);
  const str = JSON.stringify(parsed);
  const basePath = `${cwd}/.tmp/data`;
  const file = `${basePath}/${google.filename || 'copy'}.json`;

  fs.writeFile(file, str, err => {
    if (err) console.error(err);
    console.log('DONE: fetch-faq-copy.js');
    process.exit();
  });
});



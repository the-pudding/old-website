const archieml = require('archieml');
const request = require('request');
const fs = require('fs');

const cwd = process.cwd();

console.log('fetching about page copy...');

const google = {
  id: '1TRc-grkFei5z0JGVULkgRRV5dy4QU5-F1Lhh-Vd11mU',
  filename: 'about-copy'
};

const url = `https://docs.google.com/document/d/${google.id}/export?format=txt`;

request(url, function(error, response, body) {
  const parsed = archieml.load(body);
  const str = JSON.stringify(parsed);
  const basePath = `${cwd}/.tmp/data`;
  const file = `${basePath}/${google.filename || 'copy'}.json`;

  fs.writeFile(file, str, err => {
    if (err) console.error(err);
    console.log('DONE: fetch-about-copy.js');
    process.exit();
  });
});

const fse = require('fs-extra');
const replace = require('replace-in-file');
const { inlineSource } = require('inline-source');

const cwd = process.cwd();

const Meta = require(`${cwd}/templates/common/partials/meta`);
const Analytics = require(`${cwd}/templates/common/partials/analytics`);
const Header = require(`${cwd}/templates/common/partials/header`);
const Footer = require(`${cwd}/templates/common/partials/footer`);
const Content = require(`${cwd}/templates/faq/partials/content`);
const Contributors = require(`${cwd}/templates/faq/partials/contributors`);

function cleanTemp(dir) {
	console.log('cleaning tmp folder...');
	return new Promise((resolve, reject) => {
		fse.remove(`${cwd}/.tmp/${dir}`, err => {
			if (err) reject(err);
			else resolve();
		});
	});
}

function copyHTMLTemplate() {
	console.log('copying html template file...');
	fse.ensureDirSync(`${cwd}/.tmp/faq`);
	fse.copySync(
		`${cwd}/templates/faq/index.template`,
		`${cwd}/.tmp/faq/index.template`
	);
	return Promise.resolve();
}

function createMarkup() {
	console.log('creating markup...');

	const metaHTML = Meta({ title: 'Frequently Asked Questions' });
	const analyticsHTML = Analytics();
	const headerHTML = Header('../');
	const contentHTML = Content();
	const contributorsHTML = Contributors();
	const footerHTML = Footer();

	const options = {
		files: `${cwd}/.tmp/faq/index.template`,
		from: [
			'<!-- meta -->',
			'<!-- analytics -->',
			'<!-- header -->',
			'<!-- content -->',
			'<!-- contributors -->',
			'<!-- footer -->'
		],
		to: [metaHTML, analyticsHTML, headerHTML, contentHTML, contributorsHTML, footerHTML]
	};

	return new Promise((resolve, reject) => {
		replace(options)
			.then(resolve)
			.catch(reject);
	});
}

function copyHTMLToDev(files) {
	return new Promise((resolve, reject) => {
		const path = `${cwd}/.tmp/faq/index.html`;
		fse.copySync(files[0], path);
		inlineSource(path, {
			compress: false,
			ignore: ['css', 'js']
		})
			.then(html => {
				fse.ensureDirSync(`${cwd}/dev/faq`);
				fse.writeFileSync(`${cwd}/dev/faq/index.html`, html);
				resolve();
			})
			.catch(reject);
	});
}

function createHTML() {
	return new Promise((resolve, reject) => {
		copyHTMLTemplate()
			.then(createMarkup)
			.then(copyHTMLToDev)
			.then(resolve)
			.catch(reject);
	});
}

function init() {
	cleanTemp('faq')
		.then(createHTML)
		.then(() => {
			console.log('DONE: faq.js');
			process.exit();
		})
		.catch(err => console.log(err));
}

init();

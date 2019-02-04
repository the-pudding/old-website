module.exports = function({
  title = 'The Pudding',
  description = 'The Pudding explains ideas debated in culture with visual essays.'
}) {
  const post = title === 'The Pudding' ? '' : ' - The Pudding';
  return `
		<title>${title}${post}</title>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
		<meta name='description' content='${description}' />
		<meta name='news_keywords' content='The Pudding' />

		<meta property='og:title' content='${description}' />
		<meta property='og:site_name' content='The Pudding'/>
		<meta property='og:url' content='https://pudding.cool' />
		<meta property='og:description' content='${description}' />
		<meta property='og:type' content='profile' />
		<meta property='og:locale' content='en_US' />

		<meta property='og:image' content='https://pudding.cool/common/assets/misc/social-facebook.jpg' />
		<meta property='og:image:type' content='image/jpeg' />
		<meta property='og:image:width' content='1200' />
		<meta property='og:image:height' content='600' />

		<meta name='twitter:card' content='summary_large_image'>
		<meta name='twitter:site' content='https://pudding.cool'>
		<meta name='twitter:creator' content='@puddingviz'>
		<meta name='twitter:title' content='The Pudding'>
		<meta name='twitter:description' content='description'>
		<meta name='twitter:image:src' content='https://pudding.cool/common/assets/misc/social-twitter.jpg'>

		<link rel='apple-touch-icon' sizes='180x180' href='https://pudding.cool/apple-touch-icon.png'>
		<link rel='icon' type='image/png' sizes='32x32' href='https://pudding.cool/favicon-32x32.png'>
		<link rel='icon' type='image/png' sizes='16x16' href='https://pudding.cool/favicon-16x16.png'>
		<link rel='manifest' href='https://pudding.cool/site.webmanifest'>
		<link rel='mask-icon' href='https://pudding.cool/safari-pinned-tab.svg' color='#5bbad5'>
		<meta name='msapplication-TileColor' content='#ffc40d'>
		<meta name='theme-color' content='#ffffff'>

		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/national/National2NarrowWeb-Extralight.woff2'>
		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/national/National2NarrowWeb-Regular.woff2'>
		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/national/National2NarrowWeb-Bold.woff2'>
		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/national/National2NarrowWeb-Black.woff2'>
		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2'>
		<link rel='preload' type='font/woff2' as='font' crossorigin href='https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2'>
	`;
};

module.exports = function(data) {
  return `
		<title>${data.name} | The Pudding</title>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width, initial-scale=1'>
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
		<meta name='description' content='Read more from ${data.name} on The Pudding' />
		<meta name='news_keywords' content='The Pudding' />

		<meta property='og:title' content='${data.name} | The Pudding' />
		<meta property='og:site_name' content='The Pudding'/>
		<meta property='og:url' content='https://pudding.cool' />
		<meta property='og:description' content='Read more from ${data.name} on The Pudding' />
		<meta property='og:type' content='profile' />
		<meta property='og:locale' content='en_US' />

		<meta property='og:image' content='https://pudding.cool/common/assets/og-img.jpg' />
		<meta property='og:image:type' content='image/jpeg' />
		<meta property='og:image:width' content='1200' />
		<meta property='og:image:height' content='600' />

		<meta name='twitter:card' content='summary_large_image'>
		<meta name='twitter:site' content='https://pudding.cool'>
		<meta name='twitter:creator' content='@puddingviz'>
		<meta name='twitter:title' content='The Pudding'>
		<meta name='twitter:description' content='A Journal of Visual Essays'>
		<meta name='twitter:image:src' content='https://pudding.cool/common/assets/og-img.jpg'>
	`;
};

// ![CDATA[]]

function clean(str) {
  return str
    .replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;');
}

module.exports = function(data) {
  return data
    .map(
      d => `
<item>
	<title>${clean(d.hed)}</title>
	<link>https://pudding.cool/${d.url}</link>
	<description>${clean(d.dek)}</description>
	<category>${d.topic[0]}></category>
	<pubDate>${new Date(d.date).toUTCString()}</pubDate>
	<guid isPermaLink="false">${d.url}</guid>
</item>
	`
    )
    .join('');
};

module.exports = function(data) {
  const website = data.url
    ? `<li class='link__url x-small'><a href='${
        data.url
      }' target='_blank'>website</a></li>`
    : '';
  const twitter = data.twitter
    ? `<li class='link__twitter x-small'><a href='https://twitter.com/${
        data.twitter
      }' target='_blank'>@<span></span>${data.twitter}</a></li>`
    : '';
  const email = data.email
    ? `<li class='link__email x-small'><a href='mailto:${
        data.email
      }' target='_blank'>${data.email}</a></li>`
    : '';
  return `
		<div class='person'>
			<img class='person__img' src="../../common/assets/authors/${
        data.id
      }.jpg" alt="${data.name}" />
			<div class='person__info'>
				<p class='info__description'>
					<span class='description__name tk-atlas small'>${data.name}</span>
					<span class='description__bio tk-publico small'><em>${data.bio ? data.bio : ''}</em></span>
				</p>
				<ul class='info__link tk-atlas'>
					${twitter}
					${email}
					${website}
				</ul>
			</div>
		</div>
	`;
};

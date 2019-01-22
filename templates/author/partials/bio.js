module.exports = function(d) {
  const website = d.url
    ? `<li class='link__url'><a href='${
        d.url
      }' target='_blank'><img inline src='dev/common/assets/svg/link.svg'>website</a></li>`
    : '';
  const twitter = d.twitter
    ? `<li class='link__twitter'><a href='https://twitter.com/${
        d.twitter
      }' target='_blank'><img inline src='dev/common/assets/svg/twitter.svg'>@${
        d.twitter
      }</a></li>`
    : '';
  const email = d.email
    ? `<li class='link__email'><a href='mailto:${
        d.email
      }' target='_blank'><img inline src='dev/common/assets/svg/mail.svg'>${
        d.email
      }</a></li>`
    : '';
  return `
		<div class='bio'>
			<img class='bio__img' src="../../common/assets/authors/${d.id}.jpg" alt="${
    d.name
  }" />
			<div class='bio__info'>
				<p class='info__description'>
					<span class='description__name'>${d.name}</span>
					<span class='description__bio'>${d.bio ? d.bio : ''}</span>
				</p>
			</div>
			<ul class='bio__links'>
					${twitter}
					${email}
					${website}
			</ul>
		</div>
	`;
};

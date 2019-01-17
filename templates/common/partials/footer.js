module.exports = function({ path = '' }) {
  return `
		<footer class='random-background'>
			<div class='footer__inner'>
				<p class='footer__description'>
					The Pudding is an editorial publication that explains ideas debated in culture with visual essays.
				</p>

				<div class='footer__social'>
					<p>Find us on the socials</p>
					<ul>
						<li>
							<a target='_blank' href='https://www.facebook.com/pudding.viz/' class='logo--facebook'>
							<img inline src='${path}common/assets/svg/facebook.svg'></a>
						</li>

						<li>
							<a target='_blank' href='https://twitter.com/puddingviz' class='logo--twitter'>
							<img inline src='${path}common/assets/svg/twitter.svg'>
						</a>
						</li>

						<li>
							<a target='_blank' href='https://www.instagram.com/pudding.cool' class='logo--instagram'>
							<img inline src='${path}common/assets/svg/instagram.svg'>
						</li>

						<li>
							<a target='_blank' href='https://www.patreon.com/thepudding' class='logo--patreon'><img inline src='${path}${path}common/assets/svg/patreon.svg'></a>
						</li>
					</ul>
				</div>
				
				<p class='footer__location'>The Pudding<span>®</span> is made in Brooklyn, NY; Seattle, WA; San Antonio, TX; and Great Barrington, MA.</p>
			</div>
		</footer>
	`;
};

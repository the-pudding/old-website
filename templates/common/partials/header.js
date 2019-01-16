module.exports = function({ path = '' }) {
  return `
		<a href='#content' class='skip-to-main'>Skip to main content</a>
		<header>
			
			<div class='header__title>
				<a class='header__logo' href='https://pudding.cool' target='_blank'>
					<img inline src='${path}common/assets/svg/pudding-wordmark.svg'>
				</a>
			</div>
			
			<div class='header__sidebar'>
				<a class='header__logo' href='https://pudding.cool' target='_blank'>
					<img inline src='${path}common/assets/svg/pudding-logo.svg'>
				</a>
				<ul class='sidebar__social'>
					<li><a class='xxx-small' target='_blank' href='https://www.facebook.com/pudding.viz/' class='facebook-logo'><img inline src='${path}common/assets/svg/facebook.svg'></a></li>
					<li><a class='xxx-small' target='_blank' href='https://twitter.com/puddingviz' class='twitter-logo'><img inline src='${path}common/assets/svg/twitter.svg'></a></li>
					<li><a class='xxx-small' target='_blank' href='https://www.instagram.com/pudding.cool' class='instagram-logo'><img inline src='${path}common/assets/svg/instagram.svg'></a></li>
				</ul>
			</div>

			<nav class='header__nav'>
				<ul class='nav__links'>
					<li><a class='xx-small' href='https://pudding.cool/about'>About</a></li>
					<li><a class='xx-small' href='https://pudding.cool/about#contact'>Contact</a></li>
					<li><a class='xx-small' href='https://pudding.cool/about#archives'>Archives</a></li>
					<li><a class='xx-small' href='https://pudding.cool/about#topics'>Topis</a></li>
					<li><a class='xx-small' href='https://pudding.cool/#how'>How-To</a></li>
					<li><a class='xx-small' href='https://pudding.cool/#newsletter'>Join our Newsletter</a></li>
				</ul>
					
			</nav>
		</header>
	`;
};

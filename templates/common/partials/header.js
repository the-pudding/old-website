module.exports = function() {
  return `
		<a href='#content' class='skip-to-main'>Skip to main content</a>
		<header>
			
			<div class='header__title'>
				<a class='header__wordmark' href='https://pudding.cool' target='_blank'>
					<img inline src='dev/common/assets/svg/pudding-wordmark.svg'>
				</a>
			</div>
			
			<div class='header__sidebar'>
				<a class='header__logo' href='https://pudding.cool' target='_blank'>
					<img inline src='dev/common/assets/svg/pudding-logo.svg'>
				</a>
				<ul class='sidebar__social'>
					<li><a target='_blank' href='https://www.facebook.com/pudding.viz/' class='logo--facebook'><img inline src='dev/common/assets/svg/facebook.svg'></a></li>
					<li><a target='_blank' href='https://twitter.com/puddingviz' class='logo--twitter'><img inline src='dev/common/assets/svg/twitter.svg'></a></li>
					<li><a target='_blank' href='https://www.instagram.com/pudding.cool' class='logo--instagram'><img inline src='dev/common/assets/svg/instagram.svg'></a></li>
					<li><a target='_blank' href='https://www.patreon.com/thepudding' class='logo--patreon'><img inline src='dev/common/assets/svg/patreon.svg'></a></li>
				</ul>
			</div>

			<nav class='header__nav'>
				<ul class='nav__links'>
					<li><a href='https://pudding.cool/about'>About</a></li>
					<li><a href='https://pudding.cool/about#contact'>Contact</a></li>
					<li><a href='https://pudding.cool/archives'>Archives</a></li>
					<li><a href='https://pudding.cool/topics'>Topics</a></li>
					<li><a href='https://pudding.cool/#how'>How-To</a></li>
					<li><a href='http://eepurl.com/czym6f' target='_blank' class='btn'>Join our Newsletter</a></li>
				</ul>
			</nav>
			
			<div class='header__menu'>
				<btn class='header__toggle-off'>
					<img inline src='dev/common/assets/svg/x.svg'>
				</btn>
				<p class='menu__tagline'>The Pudding explains ideas debated in culture with visual essays.</p>
				<ul class='menu__links'>
					<li><a href='https://pudding.cool/about'>About</a></li>
					<li><a href='https://pudding.cool/about#contact'>Contact</a></li>
					<li><a href='https://pudding.cool/archives'>Archives</a></li>
					<li><a href='https://pudding.cool/topics'>Topics</a></li>
					<li><a href='http://eepurl.com/czym6f' target='_blank'>Join our Newsletter</a></li>
				</ul>
				<p class='menu__patreon'>We pour our ❤️ into these stories, but they take time and money. For just $1/month, you can help support us. Join our
				growing community of data-driven enthusiasts.<br><a class='random-background' href='https://www.patreon.com/thepudding' target='_blank' onclick='trackOutboundLink("https://www.patreon.com/thepudding"); return false;'>Help fund us</a></p>
			</div>
			
			<btn class='header__toggle-on'>
				<img inline src='dev/common/assets/svg/menu.svg'>
			</btn>

		</header>
	`;
};

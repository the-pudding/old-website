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
					<li><a href='https://pudding.cool/#newsletter' class='btn'>Join our Newsletter</a></li>
				</ul>
					
			</nav>
		</header>
	`;
};

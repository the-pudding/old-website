module.exports = function(path) {
  const headerClass = path === './' ? 'is-home' : '';

  return `
		<a href='#content' class='skip-to-main'>Skip to main content</a>
		<header class='${headerClass}'>
			
			<div class='header__top'>
				
				<div class='top__title'>
					<a class='title__wordmark' href='${path}' aria-label='The Pudding homepage'>
						<img inline src='dev/common/assets/svg/pudding-wordmark.svg'>
					</a>
				</div>

				<nav class='top__nav'>
					<ul class='nav__links'>
						<li><a onclick="trackOutboundLink('${path}about'); return false;" href='${path}about'>About</a></li>
						<li><a onclick="trackOutboundLink('${path}archives'); return false;" href='${path}archives'>Archives</a></li>
						<li><a onclick="trackOutboundLink('${path}topics'); return false;" href='${path}topics'>Topics</a></li>
					</ul>
				</nav>

			</div>

			<p class='header__tagline'>is a digital publication that explains ideas debated in culture with visual essays.</p>
			

			<div class='header__cta'>
				
				<div class='cta__newsletter'>
					<form action='https://poly-graph.us11.list-manage.com/subscribe/post' method='POST'>
							<input type='hidden' name='u' value='c70d3c0e372cde433143ffeab'>
							<input type='hidden' name='id' value='9af100ac0f'>
							<input label='email' class='newsletter__input' type='email' autocapitalize='off' autocorrect='off' name='MERGE0' id='MERGE0' size='25' value='' placeholder='you@example.com'>
							<div class='hidden-from-view' style='left:-10000px;position:absolute'>
								<input label='text' type='text' name='b_c70d3c0e372cde433143ffeab_9af100ac0f' tabindex='-1' value=''>
							</div>
							<input class='btn' style='' type='submit' name='submit' value='Join Our Newsletter'>
						</form>
				</div>
					
				<div class='cta__patreon'>
					<a class='btn' onclick='trackOutboundLink('https://www.patreon.com/thepudding'); return false;' target='_blank' href='https://www.patreon.com/thepudding'>Fund us on Patreon</a>
				</div>

				<ul class='cta__social'>
					<li><a target='_blank' onclick="trackOutboundLink('https://www.facebook.com/pudding.viz'); return false;" href='https://www.facebook.com/pudding.viz/' class='logo--facebook'><img inline src='dev/common/assets/svg/facebook.svg'></a></li>
					<li><a target='_blank' onclick="trackOutboundLink('https://twitter.com/puddingviz''); return false;" href='https://twitter.com/puddingviz' class='logo--twitter'><img inline src='dev/common/assets/svg/twitter.svg'></a></li>
					<li><a target='_blank' onclick="trackOutboundLink('https://www.instagram.com/pudding.cool'); return false;" href='https://www.instagram.com/pudding.cool' class='logo--instagram'><img inline src='dev/common/assets/svg/instagram.svg'></a></li>
				</ul>

			</div>

		</header>

		<aside class='sidebar'>
			
			<a class='sidebar__logo' href='${path}' aria-label='The Pudding homepage'>
				<img inline src='dev/common/assets/svg/pudding-logo.svg'>
			</a>
			
			<button class='sidebar__toggle'>
				<span class='toggle--on'>
					<img inline src='dev/common/assets/svg/menu.svg'>
				</span>
				<span class='toggle--off is-hidden'>
					<img inline src='dev/common/assets/svg/x.svg'>
				</span>
			</button>

			<div class='sidebar__menu'>
				<p class='menu__tagline'>The Pudding explains ideas debated in culture with visual essays.</p>
					<ul class='menu__links'>
						<li><a onclick="trackOutboundLink('${path}about'); return false;" href='${path}about'>About</a></li>
						<li><a onclick="trackOutboundLink('${path}topics'); return false;" href='${path}topics'>Topics</a></li>
						<li><a onclick="trackOutboundLink('${path}archives'); return false;" href='${path}archives'>Archives</a></li>
						<li><a onclick="trackOutboundLink('http://eepurl.com/czym6f'); return false;" href='http://eepurl.com/czym6f' target='_blank'>Join our Newsletter</a></li>
					</ul>
				<p class='menu__patreon'>We pour our ❤️ into these stories, but they take time and money. For just $1/month, you can help support us. Join our growing community of data-driven enthusiasts.<br><a class='random-background' href='https://www.patreon.com/thepudding' target='_blank' onclick='trackOutboundLink("https://www.patreon.com/thepudding"); return false;'>Help fund us</a></p>
			</div>					
		</aside>
	`;
};

// <li><a target='_blank' onclick="trackOutboundLink('http://eepurl.com/czym6f'); return false;" href='http://eepurl.com/czym6f' target='_blank' class='btn'>Join our Newsletter</a></li>
// <ul class='sidebar__social'>
// 	<li><a target='_blank' onclick="trackOutboundLink('https://www.instagram.com/pudding.cool'); return false;" href='https://www.instagram.com/pudding.cool' class='logo--instagram'><img inline src='dev/common/assets/svg/instagram.svg'></a></li>
// 	<li><a target='_blank' onclick="trackOutboundLink('https://twitter.com/puddingviz''); return false;" href='https://twitter.com/puddingviz' class='logo--twitter'><img inline src='dev/common/assets/svg/twitter.svg'></a></li>
// 	<li><a target='_blank' onclick="trackOutboundLink('https://www.facebook.com/pudding.viz'); return false;" href='https://www.facebook.com/pudding.viz/' class='logo--facebook'><img inline src='dev/common/assets/svg/facebook.svg'></a></li>
// 	<li><a target='_blank' onclick="trackOutboundLink('https://www.patreon.com/thepudding'); return false;" href='https://www.patreon.com/thepudding' class='logo--patreon'><img inline src='dev/common/assets/svg/patreon.svg'></a></li>
// </ul>

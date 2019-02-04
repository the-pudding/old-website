(function() {
  const fallbackData = [
    {
      image: 'projects_vocabulary',
      url: 'projects/vocabulary',
      hed: 'Rappers, Sorted by the Size of their Vocabulary'
    },
    {
      image: '2018_12_countries',
      url: '2018/12/countries',
      hed: 'The World through the Eyes of the US'
    },
    {
      image: '2018_04_birthday-paradox',
      url: '2018/04/birthday-paradox',
      hed: 'The Birthday Paradox Experiment'
    },
    {
      image: '2018_02_stand-up',
      url: '2018/02/stand-up',
      hed: 'The Structure of Stand-Up Comedy'
    },
    {
      image: '2018_08_pockets',
      url: '2018/08/pockets',
      hed: 'Women’s Pockets are Inferior'
    }
  ];
  let storyData = null;

  const facebookLogo = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000" stroke="currentColor" stroke-width=".2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
	`;

  const instagramLogo = `
		<?xml version="1.0" encoding="utf-8"?>
		<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
		<svg width='24' height='24' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
		<path d="M17,23H7c-3.3,0-6-2.7-6-6V7c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6v10C23,20.3,20.3,23,17,23z M7,3C4.8,3,3,4.8,3,7v10
			c0,2.2,1.8,4,4,4h10c2.2,0,4-1.8,4-4V7c0-2.2-1.8-4-4-4H7z"/>
		<path d="M12,17c-1.1,0-2.1-0.3-3-1c-1.1-0.8-1.8-2-2-3.3C6.7,10,8.6,7.4,11.3,7c0.5-0.1,1-0.1,1.5,0c2.2,0.3,3.9,2,4.2,4.2l0,0
			c0.2,1.3-0.1,2.6-0.9,3.7c-0.8,1.1-2,1.8-3.3,2C12.5,16.9,12.3,17,12,17z M12,9c-0.1,0-0.3,0-0.4,0c-1.6,0.2-2.8,1.8-2.5,3.4
			c0.2,1.6,1.8,2.8,3.4,2.5c0.8-0.1,1.5-0.5,2-1.2s0.7-1.4,0.6-2.2l0,0c-0.2-1.3-1.2-2.3-2.5-2.5C12.3,9,12.2,9,12,9z"/>
		<path d="M17.5,7.5c-0.3,0-0.5-0.1-0.7-0.3c-0.1-0.1-0.2-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.3,0.1-0.5,0.3-0.7
			c0.4-0.4,1-0.4,1.4,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.1,0,0.3-0.1,0.4s-0.1,0.2-0.2,0.3C18,7.4,17.8,7.5,17.5,7.5z"/>
		</svg>
	`;

  const twitterLogo = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
	`;

  const patreonLogo = `
		<svg version="1.1" id="Layer_1" width='24' height='24' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
		<g>
			
				<path fill-rule="evenodd" clip-rule="evenodd" stroke="#000000" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round" d="
				M15.7,3.3c-3.7,0-6.8,3-6.8,6.8c0,3.7,3,6.7,6.8,6.7c3.7,0,6.7-3,6.7-6.7C22.4,6.3,19.4,3.3,15.7,3.3"/>
			
				<rect x="3.7" y="3.3" stroke="#000000" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round" width="3.3" height="18"/>
		</g>
		</svg>
	`;

  const mailLogo = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
	`;

  const infoLogo = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
	`;

  function loadJS(src, cb) {
    const ref = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);

    if (cb && typeof cb === 'function') {
      script.onload = cb;
    }

    return script;
  }

  function insertStyle(css) {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));

    head.appendChild(style);
  }

  function getMetaContent(property) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      const prop = metas[i].getAttribute('property');

      if (prop === property) return metas[i].getAttribute('content');
    }

    return '';
  }

  function socialHTML() {
    const url = window.location.href;

    return `
	<div class='footer-social'>
		<p class='footer-social__preach'>Was this your jam? <span>Preach.</span></p>
		<div class='footer-social__icons'>
			<div class='footer-social__icon fb-like' data-href='${url}' data-layout='button_count' data-action='like' data-size='large' data-show-faces='true' data-share='false'></div>
			<div class='footer-social__icon'>
				<a href='https://twitter.com/share' data-size='large' class='twitter-share-button'>Tweet</a>
			</div>
		</div>
	</div>

	<div id='fb-root'></div>
	`;
  }

  function loadStories(cb) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://pudding.cool/assets/data/stories.json', true);

    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        cb(data);
      } else {
        cb(fallbackData);
      }
    };

    request.onerror = () => cb(fallbackData);

    request.send();
  }

  function recircHTML() {
    const createLink = obj => {
      return `
		<a class='footer-recirc__article' href='https://pudding.cool/${
      obj.url
    }' target='_blank'>
			<img class='article__img' src='https://pudding.cool/common/assets/story-thumbnails/640/${
        obj.image
      }.jpg' alt='${obj.hed}'>
				<div class='article__headline'>
					${obj.hed}
			</div>
		</a>
	`;
    };

    const url = window.location.href;

    const selected = storyData.slice(0, 3);
    return `
			<div class='footer-recirc'>
			<div class='footer-recirc__articles'>
				${selected.map(createLink).join('')}
			</div>	  	
		</div>
		`;
  }

  function companyHTML() {
    return `
	<div class='footer-company'>
		<div class='footer-company__cta'>
			<ul class='footer-company__cta-list'>
				<li>
					<p>Follow us
						<a href='https://www.instagram.com/pudding.cool'>${instagramLogo}</a>
						<a href='https://twitter.com/puddingviz/'>${twitterLogo}</a>
						<a href='https://facebook.com/pudding.viz/'>${facebookLogo}</a>
					</p>
				</li>
				<li>
					<p>Support us <a href='https://patreon.com/the-pudding/'>${patreonLogo}</a></p>
				</li>
				<li>
					<p>Get email from us <a href='http://eepurl.com/czym6f'>${mailLogo}</a></p>
				</li>
				<li>
					<p>Learn more about us <a href='https://pudding.cool/about'>${infoLogo}</a></p>
				</li>
			</ul>
		</div>

		<div class='footer-company__about'>
			<p class='footer-company__description'><a href='https://pudding.cool'>The Pudding</a> is a digital publication that explains ideas debated in culture with visual essays.</p>
			<p class='footer-company__trademark'>The Pudding<span>®</span> is made in Brooklyn, NY; Seattle, WA; and Great Barrington, MA.</p>
		</div>
			
	</div>
	`;
  }

  function setupSocialJS() {
    // facebook
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    loadJS('https://platform.twitter.com/widgets.js');
  }

  function insertHTML() {
    const footerEl = document.createElement('footer');

    const appendTo = getMetaContent('append-footer-to');
    const hideSocial = getMetaContent('hide-footer-social');
    const hideRecirc = getMetaContent('hide-footer-recirc');
    const hideCompany = getMetaContent('hide-footer-company');

    const parent = appendTo ? document.querySelector(appendTo) : document.body;
    const parentEl = parent || document.body;

    parentEl.appendChild(footerEl);

    footerEl.classList.add('pudding-footer');

    const html = [
      hideSocial ? '' : socialHTML(),
      hideRecirc ? '' : recircHTML(),
      hideCompany ? '' : companyHTML()
    ].join('');

    footerEl.innerHTML = html;
  }

  function init() {
    loadStories(data => {
      storyData = data;
      // insert css (this gets piped in on the build task)

      insertHTML();

      setupSocialJS();
    });
  }

  init();
})();

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
	<svg version='1.1' id='icon-facebook' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='7px' height='15px' viewBox='-0.7 -1.5 7 15' enable-background='new -0.7 -1.5 7 15' xml:space='preserve' aria-labelledby='facebook-title facebook-desc'>
	<title id='facebook-title'>Facebook</title>
	<desc id='facebook-desc'>Logo</desc>
	<g>
		<path d='M3.966,3.414H6.3l-0.275,2.58H3.952V13.5H0.847V5.994H-0.7v-2.58h1.547V1.862c0-1.11,0.261-1.949,0.788-2.513
		C2.155-1.215,3.016-1.5,4.213-1.5h2.07v2.578H4.995c-0.238,0-0.432,0.023-0.571,0.067c-0.144,0.042-0.246,0.114-0.311,0.21
		c-0.066,0.098-0.11,0.204-0.129,0.311c-0.024,0.11-0.032,0.26-0.032,0.457v1.289L3.966,3.414L3.966,3.414z' />
	</g>
	</svg>
	`;

  const instagramLogo = `
	<svg xmlns="http://www.w3.org/2000/svg" width="531.4" height="531.39" viewBox="214.302 4.302 531.399 531.395" aria-labelledby="instagram__title" role="img">
	<title id="instagram__title">Check out our instagram</title>
  	<path d="M480 52.18c70.94 0 79.35.27 107.37 1.55 25.9 1.18 39.97 5.5 49.33 9.14 11.54 4.26 21.98 11.05 30.55 19.88 8.83 8.57 15.62 19 19.88 30.55 3.64 9.36 7.97 23.43 9.15 49.33 1.28 28.02 1.55 36.43 1.55 107.37 0 70.95-.27 79.35-1.55 107.37-1.2 25.9-5.5 39.97-9.15 49.33-8.94 23.18-27.25 41.5-50.43 50.43-9.36 3.64-23.43 7.97-49.33 9.15-28.02 1.28-36.42 1.55-107.37 1.55s-79.35-.27-107.37-1.55c-25.9-1.18-39.97-5.5-49.33-9.15-11.54-4.26-21.98-11.05-30.55-19.87-8.83-8.57-15.62-19-19.88-30.56-3.64-9.36-7.97-23.43-9.15-49.33-1.27-28.02-1.55-36.42-1.55-107.37 0-70.94.28-79.35 1.55-107.37 1.2-25.9 5.5-39.97 9.15-49.33 4.26-11.54 11.05-21.98 19.88-30.55 8.57-8.83 19-15.62 30.55-19.88 9.36-3.64 23.43-7.96 49.33-9.15 28.02-1.27 36.43-1.54 107.37-1.54m0-47.88c-72.16 0-81.2.3-109.54 1.6-28.3 1.3-47.6 5.78-64.5 12.35-17.73 6.67-33.8 17.13-47.06 30.65-13.52 13.27-23.98 29.33-30.65 47.06-6.57 16.9-11.06 36.2-12.34 64.5-1.3 28.33-1.6 37.38-1.6 109.54s.3 81.2 1.6 109.55c1.3 28.28 5.8 47.6 12.37 64.5 6.67 17.72 17.13 33.78 30.64 47.05 13.28 13.52 29.35 23.98 47.07 30.65 16.9 6.57 36.22 11.06 64.5 12.35 28.34 1.3 37.4 1.6 109.54 1.6 72.17 0 81.23-.3 109.56-1.6 28.28-1.3 47.6-5.78 64.5-12.35 35.68-13.8 63.9-42.02 77.7-77.7 6.57-16.9 11.06-36.22 12.35-64.5 1.3-28.34 1.6-37.4 1.6-109.55 0-72.16-.3-81.2-1.6-109.55-1.3-28.28-5.77-47.6-12.34-64.5-6.67-17.72-17.13-33.78-30.64-47.05-13.26-13.52-29.33-23.98-47.06-30.65-16.9-6.57-36.2-11.06-64.5-12.34-28.34-1.3-37.4-1.6-109.56-1.6z"/>
  	<path d="M480 133.56c-75.35 0-136.44 61.1-136.44 136.44S404.66 406.44 480 406.44 616.44 345.34 616.44 270c0-75.35-61.1-136.44-136.44-136.44zm0 225c-48.9 0-88.56-39.65-88.56-88.56 0-48.9 39.65-88.57 88.56-88.56 48.92 0 88.57 39.65 88.57 88.56 0 48.9-39.66 88.56-88.57 88.56z"/>
  	<circle cx="621.83" cy="128.17" r="31.88"/>
</svg>
	`;

  const twitterLogo = `
	<svg version='1.1' id='icon-twitter' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='20px' height='16.253px' viewBox='2.305 1.874 20 16.253' enable-background='new 2.305 1.874 20 16.253' xml:space='preserve' aria-labelledby='twitter-title twitter-desc'>
		<title id='twitter-title'>Twitter</title>
		<desc id='twitter-desc'>Logo</desc>
		<g>
			<path d='M22.291,3.825c-0.572,0.841-1.258,1.556-2.05,2.126c0.017,0.129,0.017,0.302,0.017,0.525c0,1.111-0.156,2.206-0.475,3.301
			c-0.319,1.093-0.809,2.14-1.46,3.161c-0.651,1.013-1.43,1.901-2.334,2.665c-0.92,0.763-2.014,1.366-3.285,1.842
			c-1.273,0.477-2.635,0.701-4.096,0.682c-2.287,0-4.398-0.618-6.303-1.843c0.301,0.032,0.636,0.051,0.999,0.051
			c1.904,0,3.602-0.588,5.096-1.763c-0.889-0.016-1.683-0.286-2.396-0.808c-0.7-0.538-1.174-1.207-1.444-2.03
			c0.271,0.046,0.523,0.064,0.762,0.064c0.365,0,0.73-0.03,1.078-0.128c-0.934-0.189-1.729-0.668-2.364-1.414
			C3.401,9.51,3.082,8.638,3.101,7.635V7.588C3.672,7.907,4.289,8.081,4.94,8.113C4.385,7.731,3.923,7.257,3.59,6.652
			C3.26,6.065,3.101,5.415,3.101,4.7c0-0.745,0.19-1.43,0.571-2.081c1.029,1.269,2.269,2.285,3.729,3.033
			c1.459,0.762,3.032,1.191,4.714,1.285c-0.064-0.318-0.095-0.634-0.095-0.936c0-1.143,0.396-2.111,1.206-2.921
			c0.809-0.811,1.779-1.206,2.922-1.206c1.174,0,2.175,0.428,2.998,1.303c0.921-0.174,1.792-0.522,2.588-1
			c-0.317,0.967-0.903,1.715-1.794,2.253c0.791-0.095,1.566-0.303,2.365-0.635L22.291,3.825z' />
		</g>
	</svg>
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
		<p class='footer-social__preach'>Was this your jam? <strong>Preach.</strong></p>
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
    const shuffle = arr => {
      let currentIndex = arr.length;
      let temporaryValue;
      let randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }
      return arr;
    };

    const createLink = obj => {
      return `
		<a class='footer-recirc__article' href='https://pudding.cool/${
      obj.url
    }' target='_blank'>
			<div class='article__img' style='background-image: url("https://pudding.cool/common/assets/thumbnails/640/${
        obj.image
      }.jpg")'></div>
				<div class='article__headline'>
					${obj.hed}
			</div>
		</a>
	`;
    };

    const url = window.location.href;

    storyData.reverse();
    const filtered = storyData.filter(d => url.indexOf(d.url) === -1);
    const selected = [
      filtered.pop(),
      filtered.pop(),
      ...shuffle(filtered).slice(0, 2)
    ];
    return `
			<div class='footer-recirc'>
			<p class='footer-recirc__hed'>Picking up what we’re pudding down?</p>
			<div class='footer-recirc__articles'>
				${selected.map(createLink).join('')}
			</div>	  	
		</div>
		`;
  }

  function newsletterHTML() {
    return `
		<div class='footer-support'>
			<div class='support__subscribe support__item'>
				<p class='subscribe__overline xx-small tk-atlas'>Get the latest emailed to you.</p>
				<div class='subscribe__newsletter'>
					<form action='https://poly-graph.us11.list-manage.com/subscribe/post' method='POST'>
						<input type='hidden' name='u' value='c70d3c0e372cde433143ffeab'>
						<input type='hidden' name='id' value='9af100ac0f'>
						<input class='newsletter__input' type='email' autocapitalize='off' autocorrect='off' name='MERGE0' id='MERGE0' size='25'
						 value='' placeholder='email@address'>
						<div class='hidden-from-view' style='left: -10000px; position: absolute;'>
							<input type='text' name='b_c70d3c0e372cde433143ffeab_9af100ac0f' tabindex='-1' value=''>
						</div>
						<input class='btn btn--primary newsletter__button tk-atlas' style='' type='submit' name='submit' value='JOIN'>
					</form>
				</div>
			</div>
			<div class='support__patreon support__item tk-atlas'>
				<p class='patreon__overline xx-small'>Support us on Patreon.</p>
				<p class='patreon__content'>
					<a target='_blank' href='https://www.patreon.com/thepudding'
					 class='btn btn--dark'>Help fund us</a>
				</p>
			</div>
		</div>
		`;
  }

  function companyHTML() {
    return `
	<div class='footer-company'>
		<div class='footer-company__wrapper'>
			<div class='footer-company__left'>
				<p class='footer-company__description'><a href='https://pudding.cool'>The Pudding</a> is a digital publication that explains ideas debated in culture with visual essays.</p>
				<p class='footer-company__description'>Reach out: sup@pudding.cool or <a href='http://twitter.com/puddingviz'>@puddingviz</a>.</p>
			</div>
			<div class='footer-company__right'>
				<ul class='footer-company__contact'>
					<li>
						<a href='https://pudding.cool/about'>About
						</a>
					</li>
					<li class='share__facebook'>
						<a href='https://facebook.com/pudding.viz/'>
							${facebookLogo}
						</a>
					</li>
					<li class='share__twitter'>
						<a href='https://twitter.com/puddingviz/'>
							${twitterLogo}
						</a>
					</li>
					<li class='share__instagram'>
					<a href='https://www.instagram.com/the.pudding'>
						${instagramLogo}
					</a>
				</li>
				</ul>
			</div>
		</div>
		<div class='footer-company__trademark'><p class='footer__location xx-small tk-atlas'>The Pudding<span>®</span> is made in Brooklyn, NY; Seattle, WA; and Great Barrington, MA.</p></div>
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
    const hideNewsletter = getMetaContent('hide-footer-newsletter');
    const hideCompany = getMetaContent('hide-footer-company');

    const parent = appendTo ? document.querySelector(appendTo) : document.body;
    const parentEl = parent || document.body;

    parentEl.appendChild(footerEl);

    footerEl.classList.add('pudding-footer');
    footerEl.classList.add('tk-atlas');

    const html = [
      hideSocial ? '' : socialHTML(),
      hideRecirc ? '' : recircHTML(),
      hideNewsletter ? '' : newsletterHTML(),
      hideCompany ? '' : companyHTML()
    ].join('');

    footerEl.innerHTML = html;
  }

  function init() {
    loadStories(data => {
      storyData = data;
      // insert css (this gets piped in on the build task)
      insertStyle('*style-data*');

      insertHTML();

      setupSocialJS();
    });
  }

  init();
})();

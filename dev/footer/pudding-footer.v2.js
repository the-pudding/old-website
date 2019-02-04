(function() {
  var fallbackData = [
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
  var storyData = null;

  var facebookLogo = "\n\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#000000\" stroke=\"currentColor\" stroke-width=\".2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-facebook\"><path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path></svg>\n\t";

  var instagramLogo = "\n\t\t<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\t\t<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n\t\t<svg width='24' height='24' version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t\t\tviewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" xml:space=\"preserve\">\n\t\t<path d=\"M17,23H7c-3.3,0-6-2.7-6-6V7c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6v10C23,20.3,20.3,23,17,23z M7,3C4.8,3,3,4.8,3,7v10\n\t\t\tc0,2.2,1.8,4,4,4h10c2.2,0,4-1.8,4-4V7c0-2.2-1.8-4-4-4H7z\"/>\n\t\t<path d=\"M12,17c-1.1,0-2.1-0.3-3-1c-1.1-0.8-1.8-2-2-3.3C6.7,10,8.6,7.4,11.3,7c0.5-0.1,1-0.1,1.5,0c2.2,0.3,3.9,2,4.2,4.2l0,0\n\t\t\tc0.2,1.3-0.1,2.6-0.9,3.7c-0.8,1.1-2,1.8-3.3,2C12.5,16.9,12.3,17,12,17z M12,9c-0.1,0-0.3,0-0.4,0c-1.6,0.2-2.8,1.8-2.5,3.4\n\t\t\tc0.2,1.6,1.8,2.8,3.4,2.5c0.8-0.1,1.5-0.5,2-1.2s0.7-1.4,0.6-2.2l0,0c-0.2-1.3-1.2-2.3-2.5-2.5C12.3,9,12.2,9,12,9z\"/>\n\t\t<path d=\"M17.5,7.5c-0.3,0-0.5-0.1-0.7-0.3c-0.1-0.1-0.2-0.2-0.2-0.3c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.3,0.1-0.5,0.3-0.7\n\t\t\tc0.4-0.4,1-0.4,1.4,0c0.2,0.2,0.3,0.4,0.3,0.7c0,0.1,0,0.3-0.1,0.4s-0.1,0.2-0.2,0.3C18,7.4,17.8,7.5,17.5,7.5z\"/>\n\t\t</svg>\n\t";

  var twitterLogo = "\n\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"#000\" stroke=\"currentColor\" stroke-width=\"0\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-twitter\"><path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path></svg>\n\t";

  var patreonLogo = "\n\t\t<svg version=\"1.1\" id=\"Layer_1\" width='24' height='24' xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t\tviewBox=\"0 0 24 24\" enable-background=\"new 0 0 24 24\" xml:space=\"preserve\">\n\t\t<g>\n\t\t\t\n\t\t\t\t<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" stroke=\"#000000\" stroke-width=\"0.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"\n\t\t\t\tM15.7,3.3c-3.7,0-6.8,3-6.8,6.8c0,3.7,3,6.7,6.8,6.7c3.7,0,6.7-3,6.7-6.7C22.4,6.3,19.4,3.3,15.7,3.3\"/>\n\t\t\t\n\t\t\t\t<rect x=\"3.7\" y=\"3.3\" stroke=\"#000000\" stroke-width=\"0.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" width=\"3.3\" height=\"18\"/>\n\t\t</g>\n\t\t</svg>\n\t";

  var mailLogo = "\n\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-mail\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline></svg>\n\t";

  var infoLogo = "\n\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-info\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line></svg>\n\t";

  function loadJS(src, cb) {
    var ref = document.getElementsByTagName('script')[0];
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);

    if (cb && typeof cb === 'function') {
      script.onload = cb;
    }

    return script;
  }

  function insertStyle(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) { style.styleSheet.cssText = css; }
    else { style.appendChild(document.createTextNode(css)); }

    head.appendChild(style);
  }

  function getMetaContent(property) {
    var metas = document.getElementsByTagName('meta');

    for (var i = 0; i < metas.length; i++) {
      var prop = metas[i].getAttribute('property');

      if (prop === property) { return metas[i].getAttribute('content'); }
    }

    return '';
  }

  function socialHTML() {
    var url = window.location.href;

    return ("\n\t<div class='footer-social'>\n\t\t<p class='footer-social__preach'>Was this your jam? <span>Preach.</span></p>\n\t\t<div class='footer-social__icons'>\n\t\t\t<div class='footer-social__icon fb-like' data-href='" + url + "' data-layout='button_count' data-action='like' data-size='large' data-show-faces='true' data-share='false'></div>\n\t\t\t<div class='footer-social__icon'>\n\t\t\t\t<a href='https://twitter.com/share' data-size='large' class='twitter-share-button'>Tweet</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div id='fb-root'></div>\n\t");
  }

  function loadStories(cb) {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://pudding.cool/assets/data/stories.json', true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        cb(data);
      } else {
        cb(fallbackData);
      }
    };

    request.onerror = function () { return cb(fallbackData); };

    request.send();
  }

  function recircHTML() {
    var createLink = function (obj) {
      return ("\n\t\t<a class='footer-recirc__article' href='https://pudding.cool/" + (obj.url) + "' target='_blank'>\n\t\t\t<img class='article__img' src='https://pudding.cool/common/assets/story-thumbnails/640/" + (obj.image) + ".jpg' alt='" + (obj.hed) + "'>\n\t\t\t\t<div class='article__headline'>\n\t\t\t\t\t" + (obj.hed) + "\n\t\t\t</div>\n\t\t</a>\n\t");
    };

    var url = window.location.href;

    var selected = storyData.slice(0, 3);
    return ("\n\t\t\t<div class='footer-recirc'>\n\t\t\t<div class='footer-recirc__articles'>\n\t\t\t\t" + (selected.map(createLink).join('')) + "\n\t\t\t</div>\t  \t\n\t\t</div>\n\t\t");
  }

  function companyHTML() {
    return ("\n\t<div class='footer-company'>\n\t\t<div class='footer-company__cta'>\n\t\t\t<ul class='footer-company__cta-list'>\n\t\t\t\t<li>\n\t\t\t\t\t<p>Follow us\n\t\t\t\t\t\t<a href='https://www.instagram.com/pudding.cool'>" + instagramLogo + "</a>\n\t\t\t\t\t\t<a href='https://twitter.com/puddingviz/'>" + twitterLogo + "</a>\n\t\t\t\t\t\t<a href='https://facebook.com/pudding.viz/'>" + facebookLogo + "</a>\n\t\t\t\t\t</p>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<p>Support us <a href='https://patreon.com/the-pudding/'>" + patreonLogo + "</a></p>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<p>Get email from us <a href='http://eepurl.com/czym6f'>" + mailLogo + "</a></p>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<p>Learn more about us <a href='https://pudding.cool/about'>" + infoLogo + "</a></p>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div class='footer-company__about'>\n\t\t\t<p class='footer-company__description'><a href='https://pudding.cool'>The Pudding</a> is a digital publication that explains ideas debated in culture with visual essays.</p>\n\t\t\t<p class='footer-company__trademark'>The Pudding<span>®</span> is made in Brooklyn, NY; Seattle, WA; and Great Barrington, MA.</p>\n\t\t</div>\n\t\t\t\n\t</div>\n\t");
  }

  function setupSocialJS() {
    // facebook
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    loadJS('https://platform.twitter.com/widgets.js');
  }

  function insertHTML() {
    var footerEl = document.createElement('footer');

    var appendTo = getMetaContent('append-footer-to');
    var hideSocial = getMetaContent('hide-footer-social');
    var hideRecirc = getMetaContent('hide-footer-recirc');
    var hideCompany = getMetaContent('hide-footer-company');

    var parent = appendTo ? document.querySelector(appendTo) : document.body;
    var parentEl = parent || document.body;

    parentEl.appendChild(footerEl);

    footerEl.classList.add('pudding-footer');

    var html = [
      hideSocial ? '' : socialHTML(),
      hideRecirc ? '' : recircHTML(),
      hideCompany ? '' : companyHTML()
    ].join('');

    footerEl.innerHTML = html;
  }

  function init() {
    loadStories(function (data) {
      storyData = data;
      // insert css (this gets piped in on the build task)

      insertHTML();

      setupSocialJS();
    });
  }

  init();
})();

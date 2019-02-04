(function() {
  var DPR = Math.min(2, window.devicePixelRatio);
  var ORIG = 640;

  function header() {
    const $header = d3.select('header');
    const $menu = $header.select('.header__menu');
    const $toggleOn = $header.select('.header__toggle-on');
    const $toggleOff = $header.select('.header__toggle-off');
    $toggleOn.on('click', () => $menu.classed('is-visible', true));
    $toggleOff.on('click', () => $menu.classed('is-visible', false));
  }

  function random() {
    var numColors = 4;
    var r = Math.floor(Math.random() * numColors);
    var c = 'colorize--' + r;
    var classBackground = 'random-background--' + r;
    var classColor = 'random-color--' + r;
    var linkColor = 'random-link--' + r;
    d3.selectAll('.random-background').classed(classBackground, true);
    d3.selectAll('.random-color').classed(classColor, true);
    d3.select('body').classed(linkColor, true);
  }

  function loadImage(url, cb) {
    var img = new Image();
    img.onload = function() {
      cb(null, img);
    };
    img.onerror = function() {
      cb(`error loading image: ${url}`);
    };
    img.src = url;
  }

  function images() {
    // 640
    // 1280 = w * 2
    // 1920 = w * 3
    d3.selectAll('.story-item .item__img img').each(function() {
      var $img = d3.select(this);
      var w = $img.node().offsetWidth;
      var factor = Math.min(3, Math.ceil((w * DPR) / ORIG));
      if (factor > 1) {
        var src = $img.attr('src');
        var newSrc = src.replace(ORIG, factor * ORIG);
        loadImage(newSrc, function(err) {
          if (!err) $img.attr('src', newSrc);
        });
      }
    });
  }

  header();
  random();
  images();
})();

(function() {
  var DPR = Math.min(2, window.devicePixelRatio);
  var ORIG = 640;

  function random() {
    var numColors = 4;
    var r = Math.floor(Math.random() * numColors);
    var c = 'colorize--' + r;
    var classBackground = 'random-background--' + r;
    var classColor = 'random-color--' + r;
    d3.selectAll('.random-background').classed(classBackground, true);
    d3.selectAll('.random-color').classed(classColor, true);
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

  random();
  // images();
})();

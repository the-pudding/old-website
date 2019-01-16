(function() {
  const $authors = d3.select('.sidebar .authors select');
  // device sniffing for mobile

  function slugify(str) {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s/g, '_')
      .replace(/\W/g, '')
      .replace(/\_/g, '-');
  }

  function setupToolbar() {
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
      triggerElement: '.sidebar',
      triggerHook: 0,
      offset: 0
    })
      .setPin('.sidebar')
      .addTo(controller);

    function scrollTween(item) {
      var offset = -40;
      var distanceScrolled =
        window.pageYOffset || document.documentElement.scrollTop;
      var distanceDiv = d3
        .select(item)
        .node()
        .getBoundingClientRect().top;
      var scrollAdjust = 0;
      return function() {
        var i = d3.interpolateNumber(
          window.pageYOffset || document.documentElement.scrollTop,
          distanceScrolled + distanceDiv + offset - scrollAdjust
        );
        return function(t) {
          scrollTo(0, i(t));
        };
      };
    }

    d3.selectAll('.toolbar__item').on('click', function(d) {
      var id = d3
        .select(this)
        .text()
        .toLowerCase()
        .replace(/\s/g, '-');

      d3
        .transition()
        .delay(200)
        .duration(500)
        .tween('scroll', scrollTween('#' + id));
    });
  }

  function handleAuthorInput() {
    window.location.href = `../${this.value}`;
  }

  function setupAuthors() {
    $authors.on('input', handleAuthorInput);
  }

  function init() {
    setupToolbar();
    setupAuthors();
  }

  init();
})();

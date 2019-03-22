(function() {
  // polyfill for closest
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  function setupPicks() {
    $li = d3.selectAll('#picks li');
    const sz = $li.size();
    const target = 4;
    const count = d3.range(sz);
    d3.shuffle(count);
    const chosen = count.slice(0, target);

    $li.each((d, i, n) => {
      const $story = d3.select(n[i]);
      if (chosen.includes(i)) $story.classed('is-visible', true);
      else $story.classed('is-hidden', true);
    });
  }

  function setupHits() {
    $li = d3.selectAll('#hits li');

    $li.each((d, i, n) => {
      d3.select(n[i]).datum(i);
    });

    const sz = $li.size();
    const target = 5;
    const count = d3.range(sz);
    d3.shuffle(count);
    const chosen = count.slice(0, target);

    $li.each((d, i, n) => {
      const $story = d3.select(n[i]);
      if (chosen.includes(i)) $story.classed('is-visible', true);
      else $story.remove();
    });

    $li.sort((a, b) => d3.ascending(chosen.indexOf(a), chosen.indexOf(b)));
  }

  function handleTopicClick() {
    const $el = d3.select(this);
    const topic = $el.attr('data-topic');

    d3.selectAll('#topics .top__nav span').classed('is-active', false);
    d3.select($el.node().parentNode).classed('is-active', true);

    d3.selectAll('#topics .topics__stories ul')
      .classed('is-visible', false)
      .classed('is-hidden', true);

    const $ul = d3.select(`#topics .topics__stories [data-topic="${topic}"]`);
    $ul.classed('is-hidden', false).classed('is-visible', true);

    d3.selectAll('#topics .top__more span').classed('is-visible', false);
    const $span = d3.select(`#topics .top__more [data-topic="${topic}"]`);
    $span.classed('is-visible', true);

    if (window.generalImages) window.generalImages();

    // tracking
    if (
      window.GoogleAnalyticsObject &&
      window.ga &&
      typeof window.ga === 'function'
    )
      ga('send', {
        hitType: 'event',
        eventCategory: topic,
        eventAction: 'toggle'
      });
  }

  function setupTopics() {
    $ul = d3.selectAll('#topics .topics__stories ul');
    const sz = $ul.size();
    const count = d3.range(sz);
    d3.shuffle(count);
    const chosen = count[0];
    let slug = null;
    $ul.each((d, i, n) => {
      const $topic = d3.select(n[i]);
      if (chosen === i) {
        $topic.classed('is-visible', true);
        slug = $topic.attr('data-topic');
      } else $topic.classed('is-hidden', true);
    });

    d3.select(`#topics .top__more [data-topic="${slug}"]`).classed(
      'is-visible',
      true
    );
    d3.selectAll('#topics .top__nav span')
      .classed('is-active', (d, i) => chosen === i)
      .select('button')
      .on('click', handleTopicClick);

    if (window.generalImages) window.generalImages();
  }

  function setupTracking() {
    d3.selectAll('.story-item a').each((d, i, n) => {
      const $story = d3.select(n[i]);
      const $section = d3.select($story.node().closest('section'));
      const id = $section.attr('id');
      const url = $story.attr('href');
      const onclick = `trackOutboundLink('${url}', '${id}'); return false;`;
      $story.attr('onclick', onclick);
    });
  }

  function init() {
    setupPicks();
    setupTopics();
    setupHits();
    setupTracking();
  }

  init();
})();

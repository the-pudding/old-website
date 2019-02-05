(function() {
  const $preview = d3.select('.preview');
  const $video = $preview.select('video');
  const $collection = d3.select('.collection');
  const $loader = $collection.select('.loader');
  const $authors = d3.select('.sidebar .authors select');
  const VIDEO_WIDTH = 300;
  const VIDEO_HEIGHT = 150;
  const PAD = 10;
  // const DEFAULT_COLLECTION = 'media_diversity';

  // device sniffing for mobile

  const isMobile = {
    android: () => navigator.userAgent.match(/Android/i),

    blackberry: () => navigator.userAgent.match(/BlackBerry/i),

    ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

    opera: () => navigator.userAgent.match(/Opera Mini/i),

    windows: () => navigator.userAgent.match(/IEMobile/i),

    any: () =>
      isMobile.android() ||
      isMobile.blackberry() ||
      isMobile.ios() ||
      isMobile.opera() ||
      isMobile.windows()
  };

  function setupPicks() {
    $li = d3.selectAll('#picks li');
    const sz = $li.size();
    const target = 3;
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

    d3.selectAll('#topics .topics__nav ul li').classed('is-active', false);
    d3.select($el.node().parentNode).classed('is-active', true);

    d3.selectAll('#topics .topics__stories ul')
      .classed('is-visible', false)
      .classed('is-hidden', true);

    const $ul = d3.select(`#topics .topics__stories [data-topic="${topic}"]`);
    $ul.classed('is-hidden', false).classed('is-visible', true);

    d3.selectAll('#topics .topics__more li').classed('is-visible', false);
    const $li = d3.select(`#topics .topics__more [data-topic="${topic}"]`);
    $li.classed('is-visible', true);

    if (window.generalImages) window.generalImages();
  }

  function setupTopics() {
    $ul = d3.selectAll('#topics .topics__stories ul');
    const sz = $ul.size();
    const target = 1;
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

    d3.select(`#topics .topics__more [data-topic="${slug}"]`).classed(
      'is-visible',
      true
    );
    d3.selectAll('#topics .topics__nav ul li')
      .classed('is-active', (d, i) => chosen === i)
      .select('button')
      .on('click', handleTopicClick);

    if (window.generalImages) window.generalImages();
  }

  function init() {
    setupPicks();
    setupTopics();
    setupHits();
  }

  init();
})();

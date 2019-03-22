(function() {
  function handleTopicClick() {
    const $el = d3.select(this);

    const topic = $el.attr('data-topic');

    d3.selectAll('.top__nav span').classed('is-active', false);
    d3.select($el.node().parentNode).classed('is-active', true);

    d3.selectAll('.topics__stories ul')
      .classed('is-visible', false)
      .classed('is-hidden', true);

    const $ul = d3.select(`.topics__stories [data-topic="${topic}"]`);
    $ul.classed('is-hidden', false).classed('is-visible', true);
    if (window.generalImages) window.generalImages();
  }

  function setupTopics() {
    const { href } = window.location;
    const split = href.split('#');
    const t = split.length > 1 ? split[1] : 'music';
    $ul = d3.selectAll('.topics__stories ul');
    const sz = $ul.size();
    const count = d3.range(sz);
    d3.shuffle(count);

    const $btn = d3.select('.top__nav').select(`[data-topic='${t}']`);
    if ($btn.size()) handleTopicClick.call($btn.node());
    else {
      const $b = d3.select('.top__nav button');
      handleTopicClick.call($b.node());
    }

    d3.selectAll('.top__nav span')
      .select('button')
      .on('click', handleTopicClick);

    if (window.generalImages) window.generalImages();
  }

  function init() {
    setupTopics();
  }

  init();
})();

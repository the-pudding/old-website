(function() {
  const $li = d3.selectAll('.stories li');
  const $input = d3.select('.filter input');
  const $selectSort = d3.selectAll('.field__sort select');
  const $selectFilter = d3.selectAll('.field__filter select');
  const storyData = [];
  const attrs = [
    'id',
    'topic',
    'chart',
    'tech',
    'author',
    'hed',
    'dek',
    'date',
    'views'
  ];

  function prepareData() {
    $li.each((d, i, n) => {
      const $el = d3.select(n[i]);
      const datum = {};
      attrs.forEach(
        a => (datum[a] = $el.select('.story-item').attr(`data-${a}`))
      );
      $el.datum(datum);
      storyData.push(datum);
    });
    storyData.forEach(d => {
      d.views = +d.views;
      d.author = d.author.split(',');
      d.date = new Date(d.date);
    });
  }

  function reset() {
    $li.classed('is-hidden', false);
  }

  function handleKeyUp() {
    reset();
    if (this.value.length) {
      const ids = storyData
        .filter(d => d.hed.includes(this.value) || d.dek.includes(this.value))
        .map(d => d.id);

      $li.classed('is-hidden', d => !ids.includes(d.id));
    }
  }

  function handleFilter() {}

  function handleSort() {
    if (this.value === 'Oldest to Newest') {
      $li.sort((a, b) => d3.ascending(a.date, b.date));
    } else if (this.value === 'Newest to Oldest') {
      $li.sort((a, b) => d3.descending(a.date, b.date));
    } else if (this.value === 'Most-Viewed') {
      $li.sort((a, b) => d3.descending(a.views, b.views));
    }
  }

  function setupFilters() {
    // author
    const authorData = []
      .concat(...storyData.map(d => d.author))
      .filter((v, i, a) => a.indexOf(v) === i);

    d3.select('select.filter--author')
      .selectAll('option')
      .data(['Author', ...authorData])
      .enter()
      .append('option')
      .text(d => d);

    // topic
    const topicData = []
      .concat(...storyData.map(d => d.topic))
      .filter((v, i, a) => a.indexOf(v) === i);

    d3.select('select.filter--topic')
      .selectAll('option')
      .data(['Topic', ...topicData])
      .enter()
      .append('option')
      .text(d => d);
  }

  function init() {
    prepareData();
    setupFilters();
    $input.on('keyup', handleKeyUp);
    $selectFilter.on('input', handleFilter);
    $selectSort.on('input', handleSort);
  }

  init();
})();

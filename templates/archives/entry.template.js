(function() {
  const $li = d3.selectAll('.stories li');
  const $input = d3.select('.filter input');
  const $selectSort = d3.selectAll('.field__sort select');
  const $selectFilter = d3.selectAll('.field__filter select');
  const storyData = [];
  const filters = {
    author: null,
    topic: null,
    chart: null,
    tech: null,
    search: null
  };

  const attrs = [
    'id',
    'topic',
    'chart',
    'tech',
    'author',
    'author_slug',
    'author_name',
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
      d.author = d.author.split(',').map(d => d.trim());
      d.author_slug = d.author_slug.split(',').map(d => d.trim());
      d.author_name = d.author_name.split(',').map(d => d.trim());
      d.date = new Date(d.date);
    });
  }

  function reset() {
    $li.classed('is-hidden', false);
  }

  function applyFilters(d) {
    if (filters.author && !d.author_name.includes(filters.author)) return false;
    if (filters.topic && !d.topic.includes(filters.topic)) return false;
    if (filters.chart && !d.chart.includes(filters.chart)) return false;
    if (filters.tech && !d.tech.includes(filters.tech)) return false;
    if (
      filters.search &&
      !d.hed.includes(filters.search) &&
      !d.dek.includes(filters.search)
    )
      return false;
    return true;
  }

  function updateStories() {
    const ids = storyData.filter(applyFilters).map(d => d.id);
    $li.classed('is-hidden', d => !ids.includes(d.id));
  }

  function handleKeyUp() {
    reset();
    filters.search = this.value ? this.value : null;
    updateStories();
  }

  function handleFilter() {
    reset();
    const $el = d3.select(this);
    const f = $el.attr('data-filter');
    filters[f] = ['Author', 'Topic', 'Chart', 'Tech'].includes(this.value)
      ? null
      : this.value;
    updateStories();
  }

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
    const authorNameData = []
      .concat(...storyData.map(d => d.author_name))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(d3.ascending);

    d3.select('select.filter--author')
      .selectAll('option')
      .data(['Author', ...authorNameData])
      .enter()
      .append('option')
      .text(d => d);

    // topic
    const topicData = JSON.parse(window.topicsData);

    d3.select('select.filter--topic')
      .selectAll('option')
      .data(['Topic', ...topicData])
      .enter()
      .append('option')
      .property('value', d => d.slug)
      .text(d => d.label);
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

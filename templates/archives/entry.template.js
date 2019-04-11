(function() {
  const $li = d3.selectAll('.stories li');
  const $input = d3.select('.filter input');
  const $selectSort = d3.selectAll('.field__sort select');
  const $selectFilter = d3.selectAll('.field__filter select');

  let trackSearch = false;

  const storyData = [];
  const filters = {
    author: null,
    topic: null,
    chart: null,
    keyword: null,
    search: null
  };

  const attrs = [
    'id',
    'topic',
    'chart',
    'author',
    'keyword',
    'author_slug',
    'author_name',
    'hed',
    'dek',
    'date',
		'views',
		'time_on_page'
  ];

  function arrayify(str) {
    return str.split(',').map(d => d.trim());
  }

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
      d.author = arrayify(d.author);
      d.topic = arrayify(d.topic);
      d.keyword = arrayify(d.keyword);
      d.chart = arrayify(d.chart);
      d.author_slug = arrayify(d.author_slug);
      d.author_name = arrayify(d.author_name);
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
    if (filters.keyword && !d.keyword.includes(filters.keyword)) return false;
    if (
      filters.search &&
      !d.hed.includes(filters.search) &&
      !d.dek.includes(filters.search) &&
      !d.keyword.includes(filters.search)
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
    // tracking
    if (
      !trackSearch &&
      window.GoogleAnalyticsObject &&
      window.ga &&
      typeof window.ga === 'function'
    ) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'input'
      });
      trackSearch = true;
    }
  }

  function handleFilter() {
    reset();
    const $el = d3.select(this);
    const f = $el.attr('data-filter');
    filters[f] = ['Author', 'Topic', 'Chart Type', 'Keyword'].includes(
      this.value
    )
      ? null
      : this.value;

    updateStories();

    // tracking
    if (
      !trackSearch &&
      window.GoogleAnalyticsObject &&
      window.ga &&
      typeof window.ga === 'function'
    )
      ga('send', {
        hitType: 'event',
        eventCategory: f,
        eventAction: 'filter'
      });
  }

  function handleSort() {
    if (this.value === 'Oldest to Newest') {
      $li.sort((a, b) => d3.ascending(a.date, b.date));
    } else if (this.value === 'Newest to Oldest') {
      $li.sort((a, b) => d3.descending(a.date, b.date));
    } else if (this.value === 'Most-Viewed') {
      $li.sort((a, b) => d3.descending(a.views, b.views));
		} else if (this.value === 'Time on Page') {
			$li.sort((a, b) => d3.descending(a.time_on_page, b.time_on_page));
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

    // chart
    const chartData = []
      .concat(...storyData.map(d => d.chart.filter(v => v)))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(d3.ascending);

    d3.select('select.filter--chart')
      .selectAll('option')
      .data(['Chart Type', ...chartData])
      .enter()
      .append('option')
      .property('value', d => d)
      .text(d => d);

    // keyword
    const keywordData = []
      .concat(...storyData.map(d => d.keyword.filter(v => v)))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(d3.ascending);

    d3.select('select.filter--keyword')
      .selectAll('option')
      .data(['Keyword', ...keywordData])
      .enter()
      .append('option')
      .property('value', d => d)
      .text(d => d);
  }

  function handleTagClick() {
    const $el = d3.select(this);
    const filter = $el.attr('data-filter');
    const value = $el.text();
    const $sel = d3.select(`select.filter--${filter}`);

    $sel.selectAll('option').property('selected', d => d === value);

    handleFilter.call($sel.node());
    window.scrollTo(0, 0);

    // tracking
    if (
      !trackSearch &&
      window.GoogleAnalyticsObject &&
      window.ga &&
      typeof window.ga === 'function'
    )
      ga('send', {
        hitType: 'event',
        eventCategory: value,
        eventAction: 'tag'
      });
  }

  function setupTags() {
    $li.each((d, i, n) => {
      const $el = d3.select(n[i]);
      const $info = $el.select('.item__info');
      const k = d.keyword.map(
        v => `<button data-filter='keyword' class='tag'>${v}</button>`
      );
      const c = d.chart.map(
        v => `<button data-filter='chart' class='tag'>${v}</button>`
      );

      const html = [...k, ...c].join('');

      $info
        .append('div')
        .attr('class', 'info__tags')
        .html(html);

      $info.selectAll('button').on('click', handleTagClick);
    });
  }

  function init() {
    prepareData();
    setupFilters();
    setupTags();
    $input.on('keyup', handleKeyUp);
    $selectFilter.on('input', handleFilter);
    $selectSort.on('input', handleSort);
  }

  init();
})();

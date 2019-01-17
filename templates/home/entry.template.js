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

  function handleAuthorInput() {
    window.location.href = `author/${this.value}`;
  }

  function setupAuthors() {
    $authors.on('input', handleAuthorInput);
  }

  function init() {
    setupAuthors();
  }

  init();
})();

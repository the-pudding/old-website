(function() {
  var numColors = 4;
  var r = Math.floor(Math.random() * numColors);
  var c = 'colorize--' + r;
  var classBackground = 'random-background--' + r;
  var classColor = 'random-color--' + r;
  d3.selectAll('.random-background').classed(classBackground, true);
  d3.selectAll('.random-color').classed(classColor, true);
})();

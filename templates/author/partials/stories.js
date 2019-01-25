const cwd = process.cwd();

const Item = require(`${cwd}/templates/common/partials/item`);

function createHTML({ data }) {
  return data
    .map(story => `<li>${Item({ story, path: '../../' })}</li>`)
    .join('');
}

module.exports = function(data) {
  const html = createHTML({ data });
  return html;
};

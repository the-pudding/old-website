function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .replace(/\_/g, '-');
}

module.exports = function(authors) {
  const html = authors
    .map(
      d => `
				<option class='tk-atlas' value='${slugify(d.name)}'>${d.name}${
        d.position === 'Staff' ? ' (staff)' : ''
      }</option>
			`
    )
    .join('');
  return `<option class='tk-atlas' value=''>View Authors</option>${html}`;
};

module.exports = function(authors) {
  const html = authors
    .map(
      d => `
				<option class='tk-atlas' value='${d.slug}'>${d.name}${
        d.position === 'Staff' ? ' (staff)' : ''
      }</option>
			`
    )
    .join('');
  return `<option class='tk-atlas' value=''>View Authors</option>${html}`;
};

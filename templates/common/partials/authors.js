module.exports = function(authors) {
  const html = authors
    .map(
      d => `
				<option value='${d.slug}'>${d.name}${
        d.position === 'Staff' ? ' (staff)' : ''
      }</option>
			`
    )
    .join('');
  return `<option value=''>View Authors</option>${html}`;
};

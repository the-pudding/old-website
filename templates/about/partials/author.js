module.exports = function({ authorData, filter }) {
  return authorData
    .filter(d => d.position === filter)
    .map(d => {
      return `<a class="author" href="https://pudding.cool/author/${d.slug}">
			<div class='author__image' style="background-image:url('../common/assets/authors/${
        d.id
      }.jpg')"></div>
				<p class="author__name">${d.name}</p>
			</a>`;
    })
    .join('');
};

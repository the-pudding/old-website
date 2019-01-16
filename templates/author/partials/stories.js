module.exports = function(data) {
  return data
    .map(
      story => `
		<li class='story'>
			<a href='https://pudding.cool/${
        story.url
      }' target='_blank'><p class='story__hed small tk-atlas'>${
        story.hed
      }</p></a><p class='story__dek x-small'>${story.dek}</p>
		</li>
	`
    )
    .join('');
};

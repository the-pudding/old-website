module.exports = function({ path, story, hit }) {
  // const src = `${path}common/assets/thumbnails/640/${story.img}.jpg`;
  const src = 'https://placehold.it/640x320.jpg';

  const hitHTML = () =>
    hit ? `<p class='img__hit random-background'>${hit}</p>` : '';

  return `
		<div class='story-item'>
			<div class='item__img'>
				<a href='//pudding.cool/${story.url}'>
					<img src='${src}' alt='${story.hed}'>
				</a>
				${hitHTML()}
			</div>
			<div class='item__info'>
				<a href='//pudding.cool/${story.url}'>
					<h3 class='item__hed'>${story.hed}</h3>
				</a>
				<p class='item__dek tk-tiempos'>${story.dek}</p>
				<p class='item__author'>By ${story.author_html}</p>
			</div>
		</div>
	`;
};

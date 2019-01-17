module.exports = function({ path, story }) {
  const src = `${path}common/assets/story-thumbnails/${story.img}.jpg`;
  return `
		<div class='story-item'>
			<div class='item__img'>
				<a href='//pudding.cool/${story.url}'>
					<img src='${src}' alt='${story.hed}'>
				</a>
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

module.exports = function({ path, story, hit }) {
  // const src = `${path}common/assets/thumbnails/640/${story.img}.jpg`;
  const src = 'https://placehold.it/640x320.jpg';

  const hitHTML = () =>
    hit ? `<p class='img__hit random-background'>${hit}</p>` : '';

  const dataAttr = () =>
    `data-id='${story.url}' data-topic='${story.topic}' data-chart='${
      story.chart
    }' data-tech='${story.tech}' data-author='${
      story.author
    }' data-hed='${story.hed.toLowerCase()}' data-dek='${story.dek.toLowerCase()}' data-date='${
      story.date
    }' data-views='${story.views}'`;

  return `
		<div class='story-item' ${dataAttr()}>
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
				<time class='item__time' datetime='${story.date}'></time>
				<p class='item__author'>By ${story.author_html}</p>
			</div>
		</div>
	`;
};

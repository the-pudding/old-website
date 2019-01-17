module.exports = function() {
  return `
		<div class='cta random--background'>
			<h4 class='cta__hed'>Picking up what we’re pudding down?</h4>
			<div class='cta__items'>
				<div class='cta__newsletter'>
					<p>Get the latest emailed to you</p>
					<form action='https://poly-graph.us11.list-manage.com/subscribe/post' method='POST'>
						<input name='utf8' type='hidden' value='✓'>
						<div class='cta__input-button'>
							<input aria-label='Your email address' class='input-button__input' name='email' placeholder='you@example.com' required='' type='email'>
							<button class='btn'>Join</button>
						</div>
					</form>
				</div>
				
				<div class='cta__patreon'>
					<p>Support us on Patreon</p>
					<a class='btn' onclick='trackOutboundLink('https://www.patreon.com/thepudding'); return false;' target='_blank' href='https://www.patreon.com/thepudding'>Help fund us</a>
				</div>
			</div>
		</div>
	`;
};

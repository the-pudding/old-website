module.exports = function() {
  return `
		<div class='cta random-background'>
			<div class='cta__inner'>
				<h4 class='cta__hed'>Picking up what we’re pudding down?</h4>
				<div class='cta__items'>
					<div class='cta__newsletter'>
						<p>Get the latest emailed to you</p>
						<form action='https://poly-graph.us11.list-manage.com/subscribe/post' method='POST'>
								<input type='hidden' name='u' value='c70d3c0e372cde433143ffeab'>
								<input type='hidden' name='id' value='9af100ac0f'>
								<input class='newsletter__input' type='email' autocapitalize='off' autocorrect='off' name='MERGE0' id='MERGE0' size='25' value='' placeholder='you@example.com'>
								<div class='hidden-from-view' style='left:-10000px;position:absolute'>
									<input type='text' name='b_c70d3c0e372cde433143ffeab_9af100ac0f' tabindex='-1' value=''>
								</div>
								<input class='btn random-color' style='' type='submit' name='submit' value='JOIN'>
							</form>
					</div>
					
					<div class='cta__patreon'>
						<p>Support us on Patreon</p>
						<a class='btn random-color' onclick='trackOutboundLink('https://www.patreon.com/thepudding'); return false;' target='_blank' href='https://www.patreon.com/thepudding'>Help fund us</a>
					</div>
				</div>
			</div>
		</div>
	`;
};

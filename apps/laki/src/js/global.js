$(function() {
	$(document)
		.on('touchmove', 'body.menu_open', false);

	$('.menu_drop').on('click', function(e) {
		$(this).toggleClass('open');
		$('body, .maket_block').toggleClass('menu_open');
	});
});
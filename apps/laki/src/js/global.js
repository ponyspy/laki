$(function() {
	$(document)
		.on('touchmove', 'body.menu_open', false);

	$('.menu_drop').on('click', function(e) {
		$(this).toggleClass('open');
		$('body, .maket_block').toggleClass('menu_open');
	});

	$('.back_top').on('click', function(e) {
		$('html, body').animate({
			'scrollTop': 0
		}, 400);
	});
});
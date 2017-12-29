$(function() {
	$('.coll').on('click', function(e) {
		e.preventDefault();

		$('body').animate({
			'scrollTop': $('.content_block').offset().top
		});
	});

	var swiper = new Swiper('.swiper-container', {
		pagination: {
			clickable: true,
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
});
$(function() {
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
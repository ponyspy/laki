$(function() {
	var $parent = $('.swiper-container').parent();

	var swiper = new Swiper('.swiper-container', {
		pagination: {
			clickable: true,
			el: $parent.find('.swiper-pagination')[0],
		},
		navigation: {
			nextEl: $parent.find('.swiper-button-next')[0],
			prevEl: $parent.find('.swiper-button-prev')[0],
		},
	});

});
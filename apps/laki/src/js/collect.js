$(function() {
	var $slider = $('.collect_slider .swiper-container');
	var $slider_two = $('.patterns_slider .swiper-container');

	var swiper = new Swiper($slider[0], {
		pagination: {
			clickable: true,
			el: $slider.parent().find('.swiper-pagination')[0],
		},
		navigation: {
			nextEl: $slider.parent().find('.swiper-button-next')[0],
			prevEl: $slider.parent().find('.swiper-button-prev')[0],
		},
	});

	var swiper_two = new Swiper($slider_two[0], {
		slidesPerView: 'auto',
		centeredSlides: true,
		slideToClickedSlide: true,
		spaceBetween: 30,
	});

});
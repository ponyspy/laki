$(function() {
	$('.swiper-container').each(function() {
		var $item = $(this).parent();

		var swiper = new Swiper(this, {
			pagination: {
				clickable: true,
				el: $item.find('.swiper-pagination')[0],
			},
			navigation: {
				nextEl: $item.find('.swiper-button-next')[0],
				prevEl: $item.find('.swiper-button-prev')[0],
			},
		});
	});
});
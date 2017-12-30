$(function() {
	$('.swiper-container').each(function() {
		var $this = $(this);

		var swiper = new Swiper(this, {
			pagination: {
				clickable: true,
				el: $this.children('.swiper-pagination')[0],
			},
			navigation: {
				nextEl: $this.children('.swiper-button-next')[0],
				prevEl: $this.children('.swiper-button-prev')[0],
			},
		});
	});
});
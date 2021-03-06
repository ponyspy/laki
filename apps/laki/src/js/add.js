$(function() {
	var eng = true;

	$(document)
		.on('click', '.forward', function() {
			var $snake = $(this).parent('.snake_outer').children('.snake');
			$snake.first().clone()
				.find('option').prop('selected', false).end()
				.find('.input').val('').end()
				.insertAfter($snake.last());
		})
		.on('click', '.back', function() {
			var $snake = $(this).closest('.snake_outer').children('.snake');
			if ($snake.size() == 1) return false;
			$(this).parent('.snake').remove();
		})
		.on('scroll', function(event) {
			$(this).scrollTop() >= $('.menu_block').offset().top + $('.menu_block').height() + 11
				? $('.sub_menu_block').addClass('fixed')
				: $('.sub_menu_block').removeClass('fixed');
		});

	$('.toggle_eng').on('click', function() {
		eng = !eng;

		if (eng) {
			$('.en').prop('disabled', eng).filter('input').hide();
			$('.en').parent('.wysiwyg-container').hide();
			$('.en_img').prop('disabled', eng).hide();
			$('.ru').css('float','none').parent('.wysiwyg-container').removeAttr('style');
		} else {
			$('.en').prop('disabled', eng).filter('input').show();
			$('.en').parent('.wysiwyg-container').show();
			$('.en_img').prop('disabled', eng).show();
			$('.ru').css('float','left');
		}
	});

	$('.form_submit').on('click', function(event) {
		$(this).off();
		$('form').submit();
	});

	$('.form_cancel').on('click', function(event) {
		location.reload();
	});

});
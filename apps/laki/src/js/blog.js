$(function() {
	var $window = $(window);
	var $document = $(document);

	var context = {
		skip: 0,
		limit: 8,
		collect: window.location.hash.replace('#', '')
	};

	var scrollLoader = function(e, fire) {
		if (fire || $window.scrollTop() + $window.height() + 240 >= $document.height()) {
			context.limit = 4;

			$window.off('scroll');

			$.ajax({url: '/blog', method: 'POST', data: { context: context }, async: false }).done(function(data) {
				if (data !== 'end') {

					$('.posts_block').append(data);

					context.skip += 4;
					$window.on('scroll', scrollLoader);
				} else {
					$('.posts_loader').addClass('hide');
				}
			});
		}
	};

	$window.on('load hashchange', function(e) {
		context.skip = 0;
		context.limit = 8;
		context.collect = window.location.hash.replace('#', '');

		$('.posts_loader').removeClass('hide');
		$('#' + context.collect).addClass('current');

		$.ajax({url: '/blog', method: 'POST', data: { context: context }, async: false }).done(function(data) {
			if (data !== 'end') {
				var $data = $(data);

				$('.posts_block').empty().append($data);

				context.skip = $data.length;
				$window.off('scroll').scrollTop(0).on('scroll', scrollLoader);
			} else {
				$('.posts_block').empty();
			}
		});
	});

	$('.posts_loader').children('span').on('click', function(e) {
		$window.trigger('scroll', true);
	});

	$document
		.on('click', '.collect_item', function(e) {
			e.preventDefault();

			$('.collect_item').removeClass('current').filter(this).addClass('current');

			window.location.href = '#' + $(this).attr('id');
		})
		.on('click', '.collect_item.current', function(e) {
			e.preventDefault();

			$(this).removeClass('current');

			window.location.href = '#';
		});

});
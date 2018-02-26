$(function() {
	var unique = function (arr) {
		var obj = {};

		for (var key in arr)
			obj[ arr[key] ] = true;

		return Object.keys(obj);
	};

	var citys = unique($('.shop_city').map(function() {
		return $(this).text();
	}).toArray());


	citys.forEach(function(city) {
		$('<div>', {'class':'list_item', 'text': city}).appendTo('.list_items');
	});

	$('.list_title').on('click', function() {
		$('.list_items').toggleClass('show');
	});

	$(document).on('click', '.list_item', function(e) {
		var $this = $(this);

		$('.list_items').removeClass('show');

		if ($this.hasClass('active')) {
			$this.removeClass('active');
			$('.shop_item').show();
		} else {
			$('.list_item').removeClass('active').filter($this).addClass('active');

			var name = $this.text();

			$('.shop_item').hide().each(function(i, item) {
				var $this = $(item);

				if ($this.children('.shop_city').text() == name) {
					$this.show();
				}
			});
		}

	});

});
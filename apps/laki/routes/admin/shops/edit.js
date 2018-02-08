var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Shop = Model.Shop;

	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.shop_id;

		Shop.findById(id).exec(function(err, shop) {
			if (err) return next(err);

			res.render('admin/shops/edit.jade', { shop: shop });
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.shop_id;

		Shop.findById(id).exec(function(err, shop) {
			if (err) return next(err);

			shop.status = post.status;
			shop.time = post.time;
			shop.sym = post.sym ? post.sym : undefined;
			shop.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'city'])
					&& shop.setPropertyLocalised('city', post[locale].city, locale);

				checkNested(post, [locale, 'station'])
					&& shop.setPropertyLocalised('station', post[locale].station, locale);

				checkNested(post, [locale, 'street'])
					&& shop.setPropertyLocalised('street', post[locale].street, locale);

				checkNested(post, [locale, 'apartment'])
					&& shop.setPropertyLocalised('apartment', post[locale].apartment, locale);

			});

			shop.save(function(err, shop) {
				if (err) return next(err);

				res.redirect('back');
			});
		});
	};


	return module;
};
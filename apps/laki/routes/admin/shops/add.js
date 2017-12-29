var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Shop = Model.Shop;

	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/shops/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var shop = new Shop();

		shop._short_id = shortid.generate();
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

			res.redirect('/admin/shops');
		});
	};


	return module;
};
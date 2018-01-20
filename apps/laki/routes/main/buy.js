var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	var Shop = Model.Shop;

	module.index = function(req, res, next) {
		fs.readFile(__app_root + '/static/phone.html', function(err, phone) {
			if (err) return next(err);

			Shop.where('status').ne('hidden').exec(function(err, shops) {
				if (err) return next(err);

				res.render('main/buy.jade', { shops: shops, phone: phone });
			});
		});
	};

	return module;
};
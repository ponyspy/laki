var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	var Shop = Model.Shop;

	module.index = function(req, res, next) {
		var user_id = req.session.user_id;

		fs.readFile(__app_root + '/static/phone.html', function(err, phone) {
			if (err) return next(err);

			var Query = user_id
				? Shop.find()
				: Shop.find().where('status').ne('hidden');

			Query.sort('-date').exec(function(err, shops) {
				if (err) return next(err);

				res.render('main/buy.jade', { shops: shops, phone: phone });
			});
		});
	};

	return module;
};
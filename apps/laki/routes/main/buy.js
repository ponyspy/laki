module.exports = function(Model) {
	var module = {};

	var Shop = Model.Shop;

	module.index = function(req, res, next) {
		Shop.where('status').ne('hidden').exec(function(err, shops) {
			if (err) return next(err);

			res.render('main/buy.jade', { shops: shops });
		});
	};

	return module;
};
module.exports = function(Model) {
	var module = {};

	var Shop = Model.Shop;


	module.index = function(req, res, next) {
		var id = req.body.id;

		Shop.findByIdAndRemove(id).exec(function(err) {
			if (err) return next(err);

			res.send('ok');
		});

	};


	return module;
};
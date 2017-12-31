var jade = require('jade');

module.exports = function(Model, Params) {
	var module = {};

	var Direction = Model.Direction;
	var Collect = Model.Collect;

	var get_locale = Params.locale.get_locale;

	module.index = function(req, res) {
		res.redirect('/');
	};

	module.direction = function(req, res, next) {
		var short_id = req.params.short_id;

		Direction.findOne({ '_short_id': short_id }).where('status').ne('hidden').populate('collects').exec(function(err, direction) {
			if (err) return next(err);

			Collect.aggregate({ $sample: { size: 3 } }).exec(function(err, sim_collects) {
				if (err) return next(err);

				res.render('main/direction.jade', { direction: direction, get_locale: get_locale, sim_collects: sim_collects });
			});
		});
	};


	return module;
};
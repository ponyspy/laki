module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;
	var Collect = Model.Collect;

	module.index = function(req, res, next) {
		Direction.where('status').ne('hidden').sort('-date').populate('collects').exec(function(err, directions) {
			if (err) return next(err);

			Collect.where('main_slider').equals('true').sort('-date').exec(function(err, collects) {
				if (err) return next(err);

				res.render('main/index.jade', { directions: directions, collects: collects });
			});
		});
	};

	return module;
};
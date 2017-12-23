module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;

	module.index = function(req, res, next) {
		Direction.where('status').ne('hidden').populate('collects').exec(function(err, directions) {
			if (err) return next(err);

			res.render('main/index.jade', { directions: directions });
		});
	};

	return module;
};
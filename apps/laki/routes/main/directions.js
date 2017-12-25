var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;

	module.index = function(req, res) {
		res.redirect('/');
	};

	module.direction = function(req, res, next) {
		var short_id = req.params.short_id;

		Direction.findOne({ '_short_id': short_id }).where('status').ne('hidden').exec(function(err, direction) {
			if (err) return next(err);

			res.render('main/direction.jade', { direction: direction });
		});
	};


	return module;
};
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
		var id = req.params.short_id;
		var user_id = req.session.user_id;

		var Query = user_id
			? Direction.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] })
			: Direction.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').ne('hidden')

		Query.populate('collects').exec(function(err, direction) {
			if (!direction || err) return next(err);

			Collect.aggregate([
				{ $match: { status: { $nin: ['hidden', 'special'] } }	},
				{ $sample: { size: 3 } }]).exec(function(err, sim_items) {
				if (err) return next(err);

				res.render('main/direction.jade', { direction: direction, get_locale: get_locale, sim_items: sim_items });
			});
		});
	};


	return module;
};
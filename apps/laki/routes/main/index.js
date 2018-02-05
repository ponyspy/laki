module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;
	var Collect = Model.Collect;

	module.index = function(req, res, next) {
		var user_id = req.session.user_id;

		var Query = user_id
			? Direction.find()
			: Direction.find().where('status').ne('hidden');

		var populate_path = user_id
			? {path: 'collects' }
			: {path: 'collects', match: { 'status': { $nin: ['hidden', 'special'] } } };

		Query.sort('-date').populate(populate_path).exec(function(err, directions) {
			if (err) return next(err);

			var Query = user_id
				? Collect.find()
				: Collect.find().where('status').ne('hidden');

			Query.where('main_slider').equals('true').sort('-date').exec(function(err, collects) {
				if (err) return next(err);

				res.render('main/index.jade', { directions: directions, collects: collects });
			});
		});
	};

	return module;
};
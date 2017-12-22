var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;


	module.index = function(req, res, next) {
		Direction.find().sort('-date').limit(10).exec(function(err, directions) {
			if (err) return next(err);

			Direction.count().exec(function(err, count) {
				if (err) return next(err);

				res.render('admin/directions', {directions: directions, count: Math.ceil(count / 10)});
			});
		});
	};


	module.get_list = function(req, res, next) {
		var post = req.body;

		var Query = (post.context.text && post.context.text !== '')
			? Direction.find({ $text : { $search : post.context.text } } )
			: Direction.find();

		if (post.context.status && post.context.status != 'all') {
			Query.where('status').equals(post.context.status);
		}

		Query.count(function(err, count) {
			if (err) return next(err);

			Query.find().sort('-date').skip(+post.context.skip).limit(+post.context.limit).exec(function(err, directions) {
				if (err) return next(err);

				if (directions.length > 0) {
					var opts = {
						directions: directions,
						load_list: true,
						count: Math.ceil(count / 10),
						skip: +post.context.skip,
						compileDebug: false, debug: false, cache: true, pretty: false
					};

					res.send(jade.renderFile(__app_root + '/views/admin/directions/_directions.jade', opts));
				} else {
					res.send('end');
				}
			});
		});
	};


	return module;
};
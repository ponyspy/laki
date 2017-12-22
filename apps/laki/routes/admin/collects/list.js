var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Collect = Model.Collect;


	module.index = function(req, res, next) {
		Collect.find().sort('-date').limit(10).exec(function(err, collects) {
			if (err) return next(err);

			Collect.count().exec(function(err, count) {
				if (err) return next(err);

				res.render('admin/collects', {collects: collects, count: Math.ceil(count / 10)});
			});
		});
	};


	module.get_list = function(req, res, next) {
		var post = req.body;

		var Query = (post.context.text && post.context.text !== '')
			? Collect.find({ $text : { $search : post.context.text } } )
			: Collect.find();

		if (post.context.status && post.context.status != 'all') {
			Query.where('status').equals(post.context.status);
		}

		Query.count(function(err, count) {
			if (err) return next(err);

			Query.find().sort('-date').skip(+post.context.skip).limit(+post.context.limit).exec(function(err, collects) {
				if (err) return next(err);

				if (collects.length > 0) {
					var opts = {
						collects: collects,
						load_list: true,
						count: Math.ceil(count / 10),
						skip: +post.context.skip,
						compileDebug: false, debug: false, cache: true, pretty: false
					};

					res.send(jade.renderFile(__app_root + '/views/admin/collects/_collects.jade', opts));
				} else {
					res.send('end');
				}
			});
		});
	};


	return module;
};
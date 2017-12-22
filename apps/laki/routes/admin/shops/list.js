var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Shop = Model.Shop;


	module.index = function(req, res, next) {
		Shop.find().sort('-date').limit(10).exec(function(err, shops) {
			if (err) return next(err);

			Shop.count().exec(function(err, count) {
				if (err) return next(err);

				res.render('admin/shops', {shops: shops, count: Math.ceil(count / 10)});
			});
		});
	};


	module.get_list = function(req, res, next) {
		var post = req.body;

		var Query = (post.context.text && post.context.text !== '')
			? Shop.find({ $text : { $search : post.context.text } } )
			: Shop.find();

		if (post.context.status && post.context.status != 'all') {
			Query.where('status').equals(post.context.status);
		}

		Query.count(function(err, count) {
			if (err) return next(err);

			Query.find().sort('-date').skip(+post.context.skip).limit(+post.context.limit).exec(function(err, shops) {
				if (err) return next(err);

				if (shops.length > 0) {
					var opts = {
						shops: shops,
						load_list: true,
						count: Math.ceil(count / 10),
						skip: +post.context.skip,
						compileDebug: false, debug: false, cache: true, pretty: false
					};

					res.send(jade.renderFile(__app_root + '/views/admin/shops/_shops.jade', opts));
				} else {
					res.send('end');
				}
			});
		});
	};


	return module;
};
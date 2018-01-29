var jade = require('jade');
var fs = require('fs');

module.exports = function(Model) {
	var module = {};

	var Post = Model.Post;
	var Collect = Model.Collect;

	module.index = function(req, res, next) {
		Post.distinct('collects').exec(function(err, collects) {
			if (err) return next(err);

			Collect.find({ '_id': { $in: collects } }).where('status').ne('hidden').exec(function(err, collects) {
				if (err) return next(err);

				fs.readFile(__app_root + '/static/blog_title_' + req.locale + '.html', function(err, title) {
					res.render('main/blog.jade', { collects: collects, title: title });
				});
			});
		});
	};

	module.get_posts = function(req, res) {
		var post = req.body;

		Collect.findOne({ status: { $ne: 'hidden' }, _short_id: post.context.collect }).exec(function(err, collect) {

			var Query = collect
				? Post.find({ 'collects': collect._id })
				: Post.find();

			Query.sort('-date').skip(+post.context.skip).limit(+post.context.limit).exec(function(err, posts) {
				var opts = {
					locale: req.locale,
					posts: posts,
					compileDebug: false, debug: false, cache: true, pretty: false
				};

				if (posts && posts.length > 0) {
					res.send(jade.renderFile(__app_root + '/views/main/_posts.jade', opts));
				} else {
					res.send('end');
				}
			});
		});
	};

	module.post = function(req, res, next) {
		var id = req.params.short_id;

		Post.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').ne('hidden').exec(function(err, post) {
			if (err) return next(err);

			res.render('main/post.jade', { post: post });
		});
	};


	return module;
};
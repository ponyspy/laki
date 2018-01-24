var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Post = Model.Post;

	module.index = function(req, res, next) {
		Post.find().where('status').ne('hidden').sort('-date').exec(function(err, posts) {
			if (err) return next(err);

			res.render('main/blog.jade', { posts: posts });
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
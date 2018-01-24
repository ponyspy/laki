var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Post = Model.Post;
	var Collect = Model.Collect;

	var checkNested = Params.locale.checkNested;
	var uploadImage = Params.upload.image;


	module.index = function(req, res, next) {
		Collect.find().sort('-date').exec(function(err, collects) {
				if (err) return next(err);

				res.render('admin/posts/add.jade', {collects: collects});
			});
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var post_item = new Post();

		post_item._short_id = shortid.generate();
		post_item.status = post.status;
		post_item.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		post_item.sym = post.sym ? post.sym : undefined;
		post_item.collects = post.collects;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& post_item.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'intro'])
				&& post_item.setPropertyLocalised('intro', post[locale].intro, locale);

			checkNested(post, [locale, 'description'])
				&& post_item.setPropertyLocalised('description', post[locale].description, locale);

		});

		uploadImage(post_item, 'posts', 'poster', 1920, files.poster && files.poster[0], null, function(err) {
			if (err) return next(err);

			post_item.save(function(err, direction) {
				if (err) return next(err);

				res.redirect('/admin/posts');
			});
		});
	};


	return module;
};
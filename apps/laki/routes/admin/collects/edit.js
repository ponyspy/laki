var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Collect = Model.Collect;

	var previewImages = Params.upload.preview;
	var uploadImages = Params.upload.images;
	var uploadImage = Params.upload.image;
	var imagesUpload = Params.upload.images_upload;
	var filesDelete = Params.upload.files_delete;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		var id = req.params.collect_id;

		Collect.findById(id).exec(function(err, collect) {
			if (err) return next(err);

			previewImages(collect.images, function(err, images_preview) {
				if (err) return next(err);

				res.render('admin/collects/edit.jade', { collect: collect, images_preview: images_preview });
			});
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.collect_id;

		Collect.findById(id).exec(function(err, collect) {
			if (err) return next(err);
			console.log(post)
			collect.status = post.status;
			collect.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
			collect.sym = post.sym ? post.sym : undefined;
			collect.main_slider = post.main_slider;
			collect.main_style = post.main_style;
			collect.patterns_counter = post.patterns_counter;

			var locales = post.en ? ['ru', 'en'] : ['ru'];

			locales.forEach(function(locale) {
				checkNested(post, [locale, 'title'])
					&& collect.setPropertyLocalised('title', post[locale].title, locale);

				checkNested(post, [locale, 's_title'])
					&& collect.setPropertyLocalised('s_title', post[locale].s_title, locale);

				checkNested(post, [locale, 'intro'])
					&& collect.setPropertyLocalised('intro', post[locale].intro, locale);

				checkNested(post, [locale, 'quote'])
					&& collect.setPropertyLocalised('quote', post[locale].quote, locale);

				checkNested(post, [locale, 'signature'])
					&& collect.setPropertyLocalised('signature', post[locale].signature, locale);

				checkNested(post, [locale, 'recommends'])
					&& collect.setPropertyLocalised('recommends', post[locale].recommends, locale);

				checkNested(post, [locale, 'description'])
					&& collect.setPropertyLocalised('description', post[locale].description, locale);

			});

			async.series([
				async.apply(uploadImages, collect, 'collects', post.hold, post.images),
				async.apply(uploadImage, collect, 'collects', 'poster', 1920, files.poster && files.poster[0], post.poster_del),
				async.apply(uploadImage, collect, 'collects', 'poster_hover', 1920, files.poster_hover && files.poster_hover[0], post.poster_hover_del),
				async.apply(filesDelete, collect, 'patterns', post, files),
				async.apply(imagesUpload, collect, 'collects', 'patterns', post, files),
			], function(err, results) {
				if (err) return next(err);

				collect.save(function(err, collect) {
					if (err) return next(err);

					res.redirect('back');
				});
			});
		});
	};


	return module;
};
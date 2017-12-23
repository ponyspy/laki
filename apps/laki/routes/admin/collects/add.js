var shortid = require('shortid');
var moment = require('moment');
var async = require('async');

module.exports = function(Model, Params) {
	var module = {};

	var Collect = Model.Collect;

	var uploadImages = Params.upload.images;
	var uploadImage = Params.upload.image;
	var filesUpload = Params.upload.files_upload;
	var filesDelete = Params.upload.files_delete;
	var checkNested = Params.locale.checkNested;


	module.index = function(req, res, next) {
		res.render('admin/collects/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var collect = new Collect();

		collect._short_id = shortid.generate();
		collect.status = post.status;
		collect.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		collect.sym = post.sym ? post.sym : undefined;
		collect.main_slider = post.main_slider;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& collect.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 's_title'])
				&& collect.setPropertyLocalised('s_title', post[locale].s_title, locale);

			checkNested(post, [locale, 'quote'])
				&& collect.setPropertyLocalised('quote', post[locale].quote, locale);

			checkNested(post, [locale, 'recommends'])
				&& collect.setPropertyLocalised('recommends', post[locale].recommends, locale);

			checkNested(post, [locale, 'description'])
				&& collect.setPropertyLocalised('description', post[locale].description, locale);

		});

		async.series([
			async.apply(uploadImages, collect, 'collects', null, post.images),
			async.apply(uploadImage, collect, 'collects', 'poster', 600, files.poster && files.poster[0], null),
			async.apply(uploadImage, collect, 'collects', 'poster_hover', 600, files.poster_hover && files.poster_hover[0], null),
			async.apply(filesUpload, collect, 'collects', 'files', post, files),
		], function(err, results) {
			if (err) return next(err);

			collect.save(function(err, collect) {
				if (err) return next(err);

				res.redirect('/admin/collects');
			});
		});
	};


	return module;
};
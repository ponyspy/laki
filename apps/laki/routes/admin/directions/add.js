var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Direction = Model.Direction;
	var Collect = Model.Collect;

	var checkNested = Params.locale.checkNested;
	var uploadImage = Params.upload.image;


	module.index = function(req, res, next) {
		Collect.find().sort('-date').exec(function(err, collects) {
			if (err) return next(err);

			res.render('admin/directions/add.jade', {collects: collects});
		});
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var direction = new Direction();

		direction._short_id = shortid.generate();
		direction.status = post.status;
		direction.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		direction.collects = post.collects.filter(function(collect) { return collect != 'none'; });
		direction.main_columns = post.main_columns;
		direction.sym = post.sym ? post.sym : undefined;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& direction.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& direction.setPropertyLocalised('description', post[locale].description, locale);

		});

		uploadImage(direction, 'directions', 'poster', 1920, files.poster && files.poster[0], null, function(err) {
			if (err) return next(err);

			direction.save(function(err, direction) {
				if (err) return next(err);

				res.redirect('/admin/directions');
			});
		});
	};


	return module;
};
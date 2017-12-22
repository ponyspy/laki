var shortid = require('shortid');
var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Direction = Model.Direction;

	var checkNested = Params.locale.checkNested;
	var uploadImage = Params.upload.image;


	module.index = function(req, res, next) {
		res.render('admin/directions/add.jade');
	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;

		var direction = new Direction();

		direction._short_id = shortid.generate();
		direction.status = post.status;
		direction.date = moment(post.date.date + 'T' + post.date.time.hours + ':' + post.date.time.minutes);
		direction.collects = post.collects;

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& direction.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& direction.setPropertyLocalised('description', post[locale].description, locale);

		});

		uploadImage(collect, 'collects', 'poster', 600, files.poster && files.poster[0], null, function(err) {
			if (err) return next(err);

			direction.save(function(err, direction) {
				if (err) return next(err);

				res.redirect('/admin/directions');
			});
		});
	};


	return module;
};
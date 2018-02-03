var moment = require('moment');

module.exports = function(Model, Params) {
	var module = {};

	var Direction = Model.Direction;
	var Collect = Model.Collect;

	var checkNested = Params.locale.checkNested;
	var uploadImage = Params.upload.image;


	module.index = function(req, res, next) {
		var id = req.params.direction_id;

		Direction.findById(id).exec(function(err, direction) {
			if (err) return next(err);

			Collect.find().sort('-date').exec(function(err, collects) {
				if (err) return next(err);

				res.render('admin/directions/edit.jade', { direction: direction, collects: collects });
			});
		});

	};


	module.form = function(req, res, next) {
		var post = req.body;
		var files = req.files;
		var id = req.params.direction_id;

		Direction.findById(id).exec(function(err, direction) {
			if (err) return next(err);

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

			uploadImage(direction, 'directions', 'poster', 1920, files.poster && files.poster[0], post.poster_del, function(err) {
				if (err) return next(err);

				direction.save(function(err, direction) {
					if (err) return next(err);

					res.redirect('back');
				});
			});
		});
	};


	return module;
};
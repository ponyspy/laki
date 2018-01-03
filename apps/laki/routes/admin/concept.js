var fs = require('fs');
var async = require('async');

exports.edit = function(req, res) {
	async.series({
		intro_ru: function(callback) {
			fs.readFile(__app_root + '/static/intro_ru.html', callback);
		},
		intro_en: function(callback) {
			fs.readFile(__app_root + '/static/intro_en.html', callback);
		},
		desc_ru: function(callback) {
			fs.readFile(__app_root + '/static/desc_ru.html', callback);
		},
		desc_en: function(callback) {
			fs.readFile(__app_root + '/static/desc_en.html', callback);
		},
		quote_ru: function(callback) {
			fs.readFile(__app_root + '/static/quote_ru.html', callback);
		},
		quote_en: function(callback) {
			fs.readFile(__app_root + '/static/quote_en.html', callback);
		},
		secure_ru: function(callback) {
			fs.readFile(__app_root + '/static/secure_ru.html', callback);
		},
		secure_en: function(callback) {
			fs.readFile(__app_root + '/static/secure_en.html', callback);
		},
		protect_ru: function(callback) {
			fs.readFile(__app_root + '/static/protect_ru.html', callback);
		},
		protect_en: function(callback) {
			fs.readFile(__app_root + '/static/protect_en.html', callback);
		},
		develop_ru: function(callback) {
			fs.readFile(__app_root + '/static/develop_ru.html', callback);
		},
		develop_en: function(callback) {
			fs.readFile(__app_root + '/static/develop_en.html', callback);
		}
	}, function(err, results) {
		res.render('admin/concept.jade', { content: results });
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;

	async.series({
		intro_ru: function(callback) {
			if (!post.intro.ru) return callback(null);

			fs.writeFile(__app_root + '/static/intro_ru.html', post.intro.ru, callback);
		},
		intro_en: function(callback) {
			if (!post.intro.en) return callback(null);

			fs.writeFile(__app_root + '/static/intro_en.html', post.intro.en, callback);
		},
		desc_ru: function(callback) {
			if (!post.desc.ru) return callback(null);

			fs.writeFile(__app_root + '/static/desc_ru.html', post.desc.ru, callback);
		},
		desc_en: function(callback) {
			if (!post.desc.en) return callback(null);

			fs.writeFile(__app_root + '/static/desc_en.html', post.desc.en, callback);
		},
		quote_ru: function(callback) {
			if (!post.quote.ru) return callback(null);

			fs.writeFile(__app_root + '/static/quote_ru.html', post.quote.ru, callback);
		},
		quote_en: function(callback) {
			if (!post.quote.en) return callback(null);

			fs.writeFile(__app_root + '/static/quote_en.html', post.quote.en, callback);
		},
		secure_ru: function(callback) {
			if (!post.secure.ru) return callback(null);

			fs.writeFile(__app_root + '/static/secure_ru.html', post.secure.ru, callback);
		},
		secure_en: function(callback) {
			if (!post.secure.en) return callback(null);

			fs.writeFile(__app_root + '/static/secure_en.html', post.secure.en, callback);
		},
		protect_ru: function(callback) {
			if (!post.protect.ru) return callback(null);

			fs.writeFile(__app_root + '/static/protect_ru.html', post.protect.ru, callback);
		},
		protect_en: function(callback) {
			if (!post.protect.en) return callback(null);

			fs.writeFile(__app_root + '/static/protect_en.html', post.protect.en, callback);
		},
		develop_ru: function(callback) {
			if (!post.develop.ru) return callback(null);

			fs.writeFile(__app_root + '/static/develop_ru.html', post.develop.ru, callback);
		},
		develop_en: function(callback) {
			if (!post.develop.en) return callback(null);

			fs.writeFile(__app_root + '/static/develop_en.html', post.develop.en, callback);
		},
	}, function(err, results) {
		res.redirect('back');
	});
};
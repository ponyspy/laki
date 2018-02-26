var fs = require('fs');
var mime = require('mime');
var async = require('async');

exports.edit = function(req, res) {
	async.series({
		phone: function(callback) {
			fs.readFile(__app_root + '/static/phone.html', callback);
		},
		email: function(callback) {
			fs.readFile(__app_root + '/static/email.html', callback);
		},
		blog_title_ru: function(callback) {
			fs.readFile(__app_root + '/static/blog_title_ru.html', callback);
		},
		blog_title_en: function(callback) {
			fs.readFile(__app_root + '/static/blog_title_en.html', callback);
		}
	}, function(err, results) {
		res.render('admin/content.jade', { content: results });
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;
	var file = req.file;

	async.series({
		phone: function(callback) {
			fs.writeFile(__app_root + '/static/phone.html', post.phone, callback);
		},
		email: function(callback) {
			fs.writeFile(__app_root + '/static/email.html', post.email, callback);
		},
		blog_title_ru: function(callback) {
			fs.writeFile(__app_root + '/static/blog_title_ru.html', post.blog_title.ru, callback);
		},
		blog_title_en: function(callback) {
			fs.writeFile(__app_root + '/static/blog_title_en.html', post.blog_title.en, callback);
		},
		order_blank: function(callback) {
			if (!file) return callback(null);

			fs.rename(file.path, __glob_root + '/public/cdn/order.' + mime.getExtension(file.mimetype), callback);
		}
	}, function(err, results) {
		res.redirect('back');
	});
};
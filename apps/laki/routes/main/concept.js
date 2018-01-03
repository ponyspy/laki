var fs = require('fs');
var async = require('async');

module.exports = function() {
	var module = {};


	module.index = function(req, res) {

		async.parallel({
			intro: function(callback) {
				fs.readFile(__app_root + '/static/intro_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			desc: function(callback) {
				fs.readFile(__app_root + '/static/desc_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			quote: function(callback) {
				fs.readFile(__app_root + '/static/quote_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			secure: function(callback) {
				fs.readFile(__app_root + '/static/secure_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			protect: function(callback) {
				fs.readFile(__app_root + '/static/protect_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			},
			develop: function(callback) {
				fs.readFile(__app_root + '/static/develop_' + req.locale + '.html', function(err, content) {
					callback(null, content || '');
				});
			}
		}, function(err, results) {
			if (err) return next(err);

			res.render('main/concept.jade', results);
		});
	};

	return module;
};
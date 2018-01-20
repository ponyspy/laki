var fs = require('fs');
var mime = require('mime');

exports.edit = function(req, res) {
	fs.readFile(__app_root + '/static/phone.html', function(err, phone) {
		res.render('admin/content.jade', { phone: phone });
	});
};

exports.edit_form = function(req, res) {
	var post = req.body;
	var file = req.file;

	fs.writeFile(__app_root + '/static/phone.html', post.phone, function(err) {
		if (!file) return res.redirect('back');

		fs.rename(file.path, __glob_root + '/public/cdn/order.' + mime.getExtension(file.mimetype), function(err) {
			res.redirect('back');
		});
	});
};
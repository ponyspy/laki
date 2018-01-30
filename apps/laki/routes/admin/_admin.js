var express = require('express');
var multer = require('multer');

var upload = multer({ dest: __glob_root + '/uploads/' });

var admin = {
	main: require('./main.js'),
	collects: require('./collects/_collects.js'),
	shops: require('./shops/_shops.js'),
	directions: require('./directions/_directions.js'),
	posts: require('./posts/_posts.js'),
	users: require('./users/_users.js'),
	concept: require('./concept.js'),
	content: require('./content.js'),
	options: require('./options.js')
};

var checkAuth = function(req, res, next) {
	req.session.user_id
		? next()
		: res.redirect('/auth');
};

module.exports = (function() {
	var router = express.Router();

	router.route('/').get(checkAuth, admin.main.index);

	router.route('/concept')
		.get(checkAuth, admin.concept.edit)
		.post(checkAuth, admin.concept.edit_form);

	router.route('/content')
		.get(checkAuth, admin.content.edit)
		.post(checkAuth, upload.single('order'), admin.content.edit_form);

	router.use('/collects', checkAuth, upload.fields([ { name: 'textures' }, { name: 'poster' }, { name: 'poster_hover' } ]), admin.collects);
	router.use('/shops', checkAuth, admin.shops);
	router.use('/directions', checkAuth, upload.fields([ { name: 'poster' } ]), admin.directions);
	router.use('/posts', checkAuth, upload.fields([ { name: 'poster' } ]), admin.posts);
	router.use('/users', checkAuth, admin.users);

	router.post('/preview', checkAuth, upload.single('image'), admin.options.preview);

	return router;
})();
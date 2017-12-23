var express = require('express');
var multer = require('multer');

var upload = multer({ dest: __glob_root + '/uploads/' });

var admin = {
	main: require('./main.js'),
	collects: require('./collects/_collects.js'),
	shops: require('./shops/_shops.js'),
	directions: require('./directions/_directions.js'),
	users: require('./users/_users.js'),
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

	router.use('/collects', checkAuth, upload.fields([ { name: 'attach' }, { name: 'poster' }, { name: 'poster_hover' } ]), admin.collects);
	router.use('/shops', checkAuth, admin.shops);
	router.use('/directions', checkAuth, upload.fields([ { name: 'poster' } ]), admin.directions);
	router.use('/users', checkAuth, admin.users);

	router.post('/preview', checkAuth, upload.single('image'), admin.options.preview);

	return router;
})();
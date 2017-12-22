var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var Params = {
	locale: require('../_params/locale'),
	upload: require('../_params/upload')
};

var shops = {
	list: require('./list.js')(Model),
	add: require('./add.js')(Model, Params),
	edit: require('./edit.js')(Model, Params),
	remove: require('./remove.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(shops.list.index)
		.post(shops.list.get_list);

	router.route('/add')
		.get(shops.add.index)
		.post(shops.add.form);

	router.route('/edit/:people_id')
		.get(shops.edit.index)
		.post(shops.edit.form);

	router.route('/remove')
		.post(shops.remove.index);

	return router;
})();
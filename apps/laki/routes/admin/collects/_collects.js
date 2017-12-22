var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var Params = {
	locale: require('../_params/locale'),
	upload: require('../_params/upload')
};

var collects = {
	list: require('./list.js')(Model),
	add: require('./add.js')(Model, Params),
	edit: require('./edit.js')(Model, Params),
	remove: require('./remove.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(collects.list.index)
		.post(collects.list.get_list);

	router.route('/add')
		.get(collects.add.index)
		.post(collects.add.form);

	router.route('/edit/:collect_id')
		.get(collects.edit.index)
		.post(collects.edit.form);

	router.route('/remove')
		.post(collects.remove.index);

	return router;
})();
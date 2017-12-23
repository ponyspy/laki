var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var Params = {
	locale: require('../_params/locale'),
	upload: require('../_params/upload')
};

var directions = {
	list: require('./list.js')(Model),
	add: require('./add.js')(Model, Params),
	edit: require('./edit.js')(Model, Params),
	remove: require('./remove.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(directions.list.index)
		.post(directions.list.get_list);

	router.route('/add')
		.get(directions.add.index)
		.post(directions.add.form);

	router.route('/edit/:direction_id')
		.get(directions.edit.index)
		.post(directions.edit.form);

	router.route('/remove')
		.post(directions.remove.index);

	return router;
})();
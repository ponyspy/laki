var express = require('express');

var Model = require(__glob_root + '/models/main.js');

var Params = {
	locale: require('./_params/locale')
};

var main = {
	index: require('./index.js')(Model),
	collects: require('./collects.js')(Model),
	directions: require('./directions.js')(Model, Params),
	concept: require('./concept.js')(),
	buy: require('./buy.js')(Model),
	options: require('./options.js')(Model)
};

module.exports = (function() {
	var router = express.Router();

	router.route('/')
		.get(main.index.index);

	router.route('/collections')
		.get(main.collects.index);

	router.route('/collections/:short_id')
		.get(main.collects.collect);

	router.route('/directions')
		.get(main.directions.index);

	router.route('/directions/:short_id')
		.get(main.directions.direction);

	router.route('/buy')
		.get(main.buy.index);

	router.route('/concept')
		.get(main.concept.index);

	router.route('/lang/:locale').get(function(req, res) {
		res.cookie('locale', req.params.locale);
		res.redirect('back');
	});

	router.route('/sitemap.xml')
		.get(main.options.sitemap);

	return router;
})();
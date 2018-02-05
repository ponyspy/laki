var sitemap = require('sitemap');

module.exports = function(Model) {
	var module = {};

	var Collect = Model.Collect;
	var Direction = Model.Direction;

	module.sitemap = function(req, res, next) {

		Collect.where('status').nin(['hidden', 'special']).exec(function(err, collects) {
			Direction.where('status').ne('hidden').exec(function(err, directions) {
				var arr_directions = directions.map(function(direction) {
					return {
						url: '/directions/' + (direction.sym ? direction.sym : direction._short_id)
					};
				});

				var arr_collects = collects.map(function(collect) {
					return {
						url: '/collections/' + (collect.sym ? collect.sym : collect._short_id)
					};
				});

				var site_map = sitemap.createSitemap ({
					hostname: 'https://' + req.hostname,
					// cacheTime: 600000,
					urls: [
						{ url: '/' },
						{ url: '/concept' },
						{ url: '/buy' },
					].concat(arr_directions).concat(arr_collects)
				});

				site_map.toXML(function (err, xml) {
					if (err) return next(err);

					res.type('xml').send(xml);
				});

			});
		});
	};


	return module;
};
var sitemap = require('sitemap');

module.exports = function(Model) {
	var module = {};

	var Collect = Model.Collect;

	module.sitemap = function(req, res, next) {
		Collect.where('status').ne('hidden').exec(function(err, collects) {
			arr_collects = collects.map(function(collect) {
				return {
					url: '/collections/' + collect._short_id
				};
			});

			var site_map = sitemap.createSitemap ({
				hostname: 'https://' + req.hostname,
				// cacheTime: 600000,
				urls: [
					{ url: '/' },
					{ url: '/concept' },
					{ url: '/buy' },
				].concat(arr_collects)
			});

			site_map.toXML(function (err, xml) {
				if (err) return next(err);

				res.type('xml').send(xml);
			});

		});
	};


	return module;
};
var jade = require('jade');

module.exports = function(Model) {
	var module = {};

	var Collect = Model.Collect;

	module.index = function(req, res) {
		res.redirect('/');
	};

	module.collect = function(req, res, next) {
		var short_id = req.params.short_id;

		Collect.findOne({ '_short_id': short_id }).where('status').ne('hidden').exec(function(err, collect) {
			if (err) return next(err);

			res.render('main/collect.jade', { collect: collect });
		});
	};


	return module;
};
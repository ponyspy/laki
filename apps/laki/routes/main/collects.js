var jade = require('jade');

module.exports = function(Model, Params) {
	var module = {};

	var Collect = Model.Collect;

	var get_locale = Params.locale.get_locale;

	module.index = function(req, res) {
		res.redirect('/');
	};

	module.collect = function(req, res, next) {
		var id = req.params.short_id;

		Collect.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').ne('hidden').exec(function(err, collect) {
			if (err) return next(err);

			Collect.aggregate([{ $sample: { size: 3 } }]).exec(function(err, sim_items) {
				if (err) return next(err);

				res.render('main/collect.jade', { collect: collect, sim_items: sim_items, get_locale: get_locale });
			});
		});
	};


	return module;
};
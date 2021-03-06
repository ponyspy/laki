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
		var user_id = req.session.user_id;

		var Query = user_id
			? Collect.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] })
			: Collect.findOne({ $or: [ { '_short_id': id }, { 'sym': id } ] }).where('status').nin(['hidden', 'special'])

		Query.exec(function(err, collect) {
			if (!collect || err) return next(err);

			Collect.aggregate([
				{ $match: { status: { $nin: ['hidden', 'special'] } }	},
				{ $match: { _id : { $ne: collect._id } } },
				{ $sample: { size: 3 } }]).exec(function(err, sim_items) {
				if (err) return next(err);

				res.render('main/collect.jade', { collect: collect, sim_items: sim_items, get_locale: get_locale });
			});
		});
	};


	return module;
};
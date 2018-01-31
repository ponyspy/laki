var rimraf = require('rimraf');

module.exports = function(Model) {
	var module = {};

	var Collect = Model.Collect;
	var Direction = Model.Direction;
	var Post = Model.Post;


	module.index = function(req, res, next) {
		var id = req.body.id;

		Collect.findByIdAndRemove(id).exec(function(err) {
			if (err) return next(err);

			Direction.update({'collects': id}, { $pull: { 'collects': id } }, { 'multi': true }).exec(function() {

				Post.update({'collects': id}, { $pull: { 'collects': id } }, { 'multi': true }).exec(function() {

					rimraf(__glob_root + '/public/cdn/' + __app_name + '/collects/' + id, { glob: false }, function(err) {
						if (err) return next(err);

						res.send('ok');
					});
				});
			});
		});

	};


	return module;
};
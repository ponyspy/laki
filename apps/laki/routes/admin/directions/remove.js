module.exports = function(Model) {
	var module = {};

	var Direction = Model.Direction;


	module.index = function(req, res, next) {
		var id = req.body.id;

		Direction.findByIdAndRemove(id).exec(function(err) {
			if (err) return next(err);

			res.send('ok');
		});

	};


	return module;
};
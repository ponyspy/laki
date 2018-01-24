module.exports = function(Model) {
	var module = {};

	var Post = Model.Post;


	module.index = function(req, res, next) {
		var id = req.body.id;

		Post.findByIdAndRemove(id).exec(function(err) {
			if (err) return next(err);

			res.send('ok');
		});

	};


	return module;
};
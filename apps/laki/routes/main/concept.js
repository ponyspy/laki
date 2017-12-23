module.exports = function() {
	var module = {};


	module.index = function(req, res) {
		res.render('main/concept.jade');
	};


	return module;
};
module.exports.get_locale = function(option, lang) {
	return ((option.filter(function(locale) {return locale.lg == lang; })[0] || {}).value || '');
};
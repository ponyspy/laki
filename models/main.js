var mongoose = require('mongoose'),
		mongooseLocale = require('mongoose-locale'),
		mongooseBcrypt = require('mongoose-bcrypt');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' +  __app_name, { useMongoClient: true });


// ------------------------
// *** Schema Block ***
// ------------------------


var userSchema = new Schema({
	login: String,
	password: String,
	email: String,
	status: String,
	date: { type: Date, default: Date.now },
});

var collectSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	quote: { type: String, trim: true, locale: true },
	intro: { type: String, trim: true, locale: true },
	s_title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	recommends: { type: String, trim: true, locale: true },
	main_slider: Boolean,
	sym: { type: String, trim: true, index: true, unique: true, sparse: true },
	poster: { type: String },
	poster_hover: { type: String },
	images: [{
		description: { type: String, trim: true, locale: true },
		original: { type: String },
		thumb: { type: String },
		preview: { type: String }
	}],
	files: [{
		path: { type: String },
		description: { type: String, trim: true, locale: true }
	}],
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var directionSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	collects: [{ type: ObjectId, ref: 'Collect' }],
	poster: { type: String },
	main_columns: Number,
	sym: { type: String, trim: true, index: true, unique: true, sparse: true },
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});

var shopSchema = new Schema({
	city: { type: String, trim: true, locale: true },
	station: { type: String, trim: true, locale: true },
	street: { type: String, trim: true, locale: true },
	apartment: { type: String, trim: true, locale: true },
	time: String,
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});


var postSchema = new Schema({
	title: { type: String, trim: true, locale: true },
	description: { type: String, trim: true, locale: true },
	poster: { type: String },
	sym: { type: String, trim: true, index: true, unique: true, sparse: true },
	status: String,
	_short_id: { type: String, unique: true, index: true, sparse: true },
	date: { type: Date, default: Date.now },
});


// ------------------------
// *** Index Block ***
// ------------------------


directionSchema.index({'date': -1});
collectSchema.index({'date': -1});
shopSchema.index({'date': -1});
shopSchema.index({'date': -1});

directionSchema.index({'title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
collectSchema.index({'title.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
shopSchema.index({'city.value': 'text', 'station.value': 'text', 'street.value': 'text'}, {language_override: 'lg', default_language: 'ru'});
postSchema.index({'title.value': 'text', 'description.vaue': 'text'}, {language_override: 'lg', default_language: 'ru'});


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });

collectSchema.plugin(mongooseLocale);
directionSchema.plugin(mongooseLocale);
shopSchema.plugin(mongooseLocale);
postSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Collect = mongoose.model('Collect', collectSchema);
module.exports.Direction = mongoose.model('Direction', directionSchema);
module.exports.Shop = mongoose.model('Shop', shopSchema);
module.exports.Post = mongoose.model('Post', postSchema);
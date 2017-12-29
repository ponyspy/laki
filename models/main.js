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


// ------------------------
// *** Index Block ***
// ------------------------


directionSchema.index({'date': -1});


// ------------------------
// *** Plugins Block ***
// ------------------------


userSchema.plugin(mongooseBcrypt, { fields: ['password'] });

collectSchema.plugin(mongooseLocale);
directionSchema.plugin(mongooseLocale);
shopSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Collect = mongoose.model('Collect', collectSchema);
module.exports.Direction = mongoose.model('Direction', directionSchema);
module.exports.Shop = mongoose.model('Shop', shopSchema);
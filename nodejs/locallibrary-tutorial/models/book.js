const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: { type: String, required: true, max: 128 },
	author: { type: Schema.Types.ObjectId, ref: 'Author', requried: true },
	summary: { type: String, max: 256, required: true },
	isbn: { type: String, max: 128, required: true },
	genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

BookSchema.virtual('url').get(function() {
	return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);

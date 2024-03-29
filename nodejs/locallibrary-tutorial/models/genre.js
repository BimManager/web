const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
	name: { type: String, required: true, min: 3, max: 100,
			enum: ['Horror', 'Fiction', 'Non-fiction', 'Science Fiction',
				   'Romance', 'Mystery', 'Fantasy', 'French Poetry', 'Foo'] }
});

GenreSchema.virtual('url').get(function() {
	return '/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);



const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
	book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
	imprint: { type: String, required: true },
	status: { type: String, default: 'Maintenance',
			  enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'] },
	due_back: { type: Date, default: Date.now }
});

BookInstanceSchema.virtual('url').get(function() {
	return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema.virtual('due_back_formatted').get(function() {
	return moment(this.due_back).format('MMMM Do, YYYY');
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
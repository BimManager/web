const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, max: 100 },
	family_name: { type: String, required: true, max: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date }
});

AuthorSchema.virtual('name').get(function() {
	let fullname = '';
	if (this.first_name && this.family_name) {
		fullname = this.first_name + ', ' + this.family_name;
	}
	return (fullname);
});

AuthorSchema.virtual('lifespan').get(function() {
	return moment(this.birth_date).format('MMMM Do, YYYY') + ' - ' +
		this.death_date ? moment(this.death_date).format('MMMM Do, YYYY') : '';
	//return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

AuthorSchema.virtual('url').get(function() {
	return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);





const async = require('async');

const Author = require('../models/author');
const Book = require('../models/book');

module.exports.author_list = (req, res, next) => {
	Author.find({}).exec((err, author_list) => {
		if (err) { return next(err); }
		res.render('author_list', { title: 'Authors', authors: author_list });
	});
};

module.exports.author_detail = (req, res, next) => {
	async.parallel({
		author: (cb) => {
			Author.findById(req.params.id).exec(cb);
		},
		books: (cb) => {
			Book.find({ 'author': req.params.id }).exec(cb);
		}
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('author_detail', {
			title: results.author.name,
			author: results.author,
			books: results.books
		});
	});
};

module.exports.author_create_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Author create GET');
};

module.exports.author_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Author create POST');
};

module.exports.author_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Author update GET');
};

module.exports.author_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Author update POST');
};

module.exports.author_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Author delete GET');
};

module.exports.author_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Author delete POST');
};

const validator = require('express-validator');
const Genre = require('../models/genre');
const Book = require('../models/book');

module.exports.genre_list = (req, res, next) => {
	Genre.find({}).exec((err, genre_list) => {
		if (err) { return next(err); }
		res.render('genre_list', { title: 'Genre List', genres: genre_list });
	});
};

module.exports.genre_detail = (req, res, next) => {
	Genre.findById(req.params.id).exec((err, a_genre) => {
		if (err) { return next(err); }
		Book.find({ genre: a_genre }).exec((err, book_list) => {
			if (err) { return next(err); }
			res.render('genre_detail',
					   { title: `Genre: ${a_genre.name}`, books: book_list });
		});
	});
};

module.exports.genre_create_get = (req, res) => {
	res.render('genre_form', { title: 'Create Genre' });
};

module.exports.genre_create_post = [
	validator.body('name', 'Genre name required').trim().isLength({ min: 1 }),
	validator.sanitizeBody('name').escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		const genre = new Genre({ name: req.body.name });
		if (!errors.isEmpty()) {
			res.render('genre_form', {
				title: 'Create Genre', genre: genre, errors: errors.array() });
			return ;
		}
		Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
			if (err) { return next(err); }
			if (found_genre) {
				res.redirect(found_genre.url);
			}
			else {
				genre.save((err) => {
					res.redirect(genre.url);
				});
			}
				
		});
	}
];

module.exports.genre_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Genre update GET');
};

module.exports.genre_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Genre update POST');
};

module.exports.genre_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Genre delete GET');
};

module.exports.genre_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Genre delete POST');
};

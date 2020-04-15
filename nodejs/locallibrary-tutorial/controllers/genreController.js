const async = require('async');

const validator = require('express-validator');
const Genre = require('../models/genre');
const Book = require('../models/book');

module.exports.genre_list = (req, res, next) => {
	Genre.find({}).exec((err, genre_list) => {
		if (err) { return next(err); }
		genre_list.sort((g1, g2) => g1.name.localeCompare(g2.name));
		res.render('genre_list', { title: 'Genre List', genres: genre_list });
	});
};

module.exports.genre_detail = (req, res, next) => {
	async.parallel({
		genre: (cb) => Genre.findById(req.params.id).exec(cb),
		books: (cb) =>Book.find({ 'genre': req.params.id }).exec(cb)
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('genre_detail',
				   { genre: results.genre, books: results.books });
	});
};

module.exports.genre_create_get = (req, res) => {
	res.render('genre_form', { title: 'Create Genre', names: Genre.schema.path('name').enumValues });
};

module.exports.genre_create_post = [
	validator.body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		const genre = new Genre({ name: req.body.name });
		if (!errors.isEmpty()) {
			res.render('genre_form', {
				title: 'Create Genre', genre: genre, names:
				Genre.schema.path('name').enumValues, errors: errors.array() });
			return ;
		}
		Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
			if (err) { return next(err); }
			if (found_genre) {
				res.redirect(found_genre.url);
				return ;
			}
			genre.save((err) => {
				if (err) { return next(err); }
				res.redirect(genre.url);
			});
		});
	}
];

module.exports.genre_update_get = (req, res, next) => {
	Genre.findById(req.params.id).exec((err, genre) => {
		if (err) { return next(err); }
		res.render('genre_form', { title: 'Update Genre', genre: genre });
	});
};

module.exports.genre_update_post = [
	validator.check('name').isLength({ min: 1 }).withMessage('Name is required'),
	validator.sanitizeBody('name').escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		if (!errors.isEmpty()) {
			res.render('genre_form', { title: 'Update Genre', errors: errors.array() });
			return ;
		}
		Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {}, (err, thegenre) => {
			if (err) { return next(err); }
			res.redirect(thegenre.url);
		});
	}
];


module.exports.genre_delete_get = (req, res, next) => {
	Book.find({ genre: req.params.id }).exec((err, book_list) => {
		if (err) { return next(err); }
		if (book_list.length)
			res.render('genre_delete', { title: 'Delete Genre', books: book_list });
		else
			res.render('genre_delete', { title: 'Delete Genre' });
	});
};

module.exports.genre_delete_post = (req, res, next) => {
	Genre.findByIdAndRemove(req.params.id, (err) => {
		if (err) { return next(err); }
		res.redirect('/catalog/genres');
	});
};

const async = require('async');
const validator = require('express-validator');

const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

module.exports.index = (req, res) => {
	async.parallel({
		books_count: (cb) => {
			Book.countDocuments({}, cb);
		},
		bookinstances_count: (cb) => {
			BookInstance.countDocuments({}, cb);
		},
		bookinstances_available_count: (cb) => {
			BookInstance.countDocuments({status: 'Available'}, cb);
		},
		authors_count: (cb) => {
			Author.countDocuments({}, cb);
		},
		genres_count: (cb) => {
			Genre.countDocuments({}, cb);
		}
	}, (err, results) => {
		res.render('index', { title: 'Local Library Home', error: err, data: results });
	});
};

module.exports.book_list = (req, res, next) => {
	Book.find({}, 'title author')
		.populate('author')
		.exec((err, book_list) => {
			if (err) { return next(err); }
			book_list.sort((b1, b2) => b1.title.localeCompare(b2.title));
			res.render('book_list', { title: 'Book List', books: book_list });
		});
};

module.exports.book_detail = (req, res, next) => {
	async.parallel({
		book: (cb) => {
			Book.findById(req.params.id)
				.populate('genre')
				.populate('author').exec(cb);
		},
		bookinstances: (cb) => {
			BookInstance.find({ 'book': req.params.id }).exec(cb);
		}
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('book_detail',
				   { title: results.book.title,
					 book: results.book,
					 bookinstances: results.bookinstances });
									
	});
};

module.exports.book_create_get = (req, res, next) => {
	async.parallel({
		genre_list: (cb) => { Genre.find({}).exec(cb) },
		author_list: (cb) => { Author.find({}).exec(cb) },
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('book_form', {
			title: 'Create Book', authors: results.author_list.sort(
				(a1, a2) => a1.family_name.toUpperCase().localeCompare(
					a2.family_name.toUpperCase())),
			genres: results.genre_list });
	});
};

module.exports.book_create_post = [
	validator.body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
	validator.body('summary').trim().isLength({ min: 1 }).withMessage('Summary is required'),
	validator.body('isbn').trim().isLength({ min: 1 }).withMessage('ISBN is required'),
	validator.body('*').escape(),
	(req, res, next) => {
		const book = new Book({
			title: req.body.title, author: req.body.author,
			summary: req.body.summary, isbn: req.body.isbn,
			genre: req.body.genre });
		const errors = validator.validationResult(req);
		if (!errors.isEmpty()) {
			async.parallel({
				authors: (cb) => Author.find({}).exec(cb),
				genres: (cb) => Genre.find({}).exec(cb)
			}, (err, results) => {
				if (err) { return next(err); }
				res.render('book_form', {
					title: 'Create Book', authors: results.authors,
					genres: results.genres, errors: errors.array() });
			});
			return ;
		}
		book.save((err) => {
			if (err) { return next(err); }
			res.redirect(book.url);
		})
	}
];

module.exports.book_update_get = (req, res, next) => {
	async.parallel({
		book: (cb) => Book.findById(req.params.id).populate('author').exec(cb),
		author_list: (cb) => Author.find({}).exec(cb),
		genre_list: (cb) => Genre.find({}).exec(cb)
	}, (err, results) => {
		if (err) { return next(err); }
		const checked = results.book.genre;
		i = -1;
		while (++i < results.genre_list.length) {
			if (checked.indexOf(results.genre_list[i]._id) != -1)
				results.genre_list[i].checked = true;
			else
				results.genre_list[i].checked = false;
		}				   
		res.render('book_form', {
			title: 'Update Book', book: results.book, authors: results.author_list,
			genres: results.genre_list });
	});
};

module.exports.book_update_post = [
	(req, res, next) => {
		if (!(req.body.genre instanceof Array)) {
			if (undefined === typeof req.body.genre) { req.body.genre = []; }
			else { req.body.genre = new Array(req.body.genre); }
		}
		next();
	},
	validator.check('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
	validator.check('summary').trim().isLength({ min: 1 }).withMessage('Summary is required'),
	validator.check('isbn').trim().isLength({ min: 1 }).withMessage('ISBN is required'),
	validator.sanitizeBody('title').escape(), validator.sanitizeBody('summary').escape(),
	validator.sanitizeBody('isbn').escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		const book = new Book({
			title: req.body.title,
			author: req.body.author,
			summary: req.body.summary,
			isbn: req.body.isbn,
			genre: req.body.genre,
			_id: req.params.id
		});
		if (!errors.isEmpty()) {
			async.parallel({
				authors: (cb) => Author.find(cb),
				genres: (cb) => Genre.find(cb),
			}, (err, results) => {
				res.render('book_form', {
					title: 'Update Book', book: book, authors: results.authors,
					genres: results.genres, errors: errors.array() });
			});
			return ;
		}
		Book.findByIdAndUpdate(req.params.id, book, {}, (err, thebook) => {
			if (err) { return next(err); }
			res.redirect(book.url);
		});
	}
];


module.exports.book_delete_get = (req, res, next) => {
	async.parallel({
		book: (cb) => Book.findById(req.params.id).exec(cb),
		instances: (cb) => BookInstance
			.find({ 'book' : req.params.id }).exec(cb)
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('book_delete', {
			book: results.book,
			instances: results.instances });
	});
};

module.exports.book_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Book delete POST');
};

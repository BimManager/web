const async = require('async');

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

module.exports.book_create_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Book create GET');
};

module.exports.book_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Book create POST');
};

module.exports.book_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Book update GET');
};

module.exports.book_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Book update POST');
};

module.exports.book_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Book delete GET');
};

module.exports.book_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Book delete POST');
};

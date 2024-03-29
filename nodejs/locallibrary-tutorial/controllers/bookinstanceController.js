const async = require('async');
const validator = require('express-validator');

const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');

module.exports.bookinstance_list = (req, res, next) => {
	BookInstance.find({})
		.populate('book')
		.exec((err, bookinstance_list) => {
			if (err) { return next(err); }
			bookinstance_list.sort((i1, i2) => i1.book.title.localeCompare(i2.book.title));
			res.render('bookinstance_list',
					   { title: 'Book Instance List', instances: bookinstance_list });
		});
};

module.exports.bookinstance_detail = (req, res, next) => {
	BookInstance.findById(req.params.id).populate('book').exec((err, an_instance) => {
		if (err) { return next(err); }
		res.render('bookinstance_detail', {
			title: 'ID: ' + an_instance._id,
			instance: an_instance
		});
	});
};

module.exports.bookinstance_create_get = (req, res, next) => {
	Book.find({}).exec((err, book_list) => {
		if (err) { return next(err); }
		res.render('bookinstance_form', {
			title: 'Creake Book Instance',
			books: book_list
		});
	});
};

module.exports.bookinstance_create_post = [
	validator.body('imprint').trim().isLength({ min: 1 }).withMessage('Imprint is required'),
	validator.body('due_back').trim().optional({ checkFalsy: true }).isISO8601().withMessage('Invalid date'),
	validator.sanitizeBody('*').escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		if (!errors.isEmpty()) {
			Book.find({}).exec((err, book_list) => {
				res.render('bookinstance_form', {
					title: 'Create Book Instance',
					books: book_list,
					errors: errors.array() });
			});
			return ;
		}
		const bookinstance = new BookInstance({
			book: req.body.book,
			imprint: req.body.imprint,
			due_back: req.body.due_back,
			status: req.body.status });
		bookinstance.save((err) => {
			if (err) { return next(err); }
			res.redirect(bookinstance.url);
		});
	}
];

module.exports.bookinstance_update_get = (req, res, next) => {
	async.parallel({
		instance: (cb) => BookInstance.findById(req.params.id).exec(cb),
		books: (cb) => Book.find({}).exec(cb)
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('bookinstance_form', {
			title: 'Update Book Instance', books: results.books,
			instance: results.instance });
	});
};

module.exports.bookinstance_update_post = [
	validator.body('imprint').trim().isLength({ min: 1 }).withMessage('Imprint is required').escape(),
	validator.body('due_back').trim().optional({ checkFalsy: true })
		.isISO8601().withMessage('Invalid date').escape(),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		const bookinstance = new BookInstance({
			book: req.body.book,
			imprint: req.body.imprint,
			due_back: req.body.due_back,
			status: req.body.status,
			_id: req.params.id });
		if (!errors.isEmpty()) {
			Book.find({}).exec((err, book_list) => {
				res.render('bookinstance_form', {
					title: 'Create Book Instance',
					books: book_list,
					instance: bookinstance,
					errors: errors.array() });
			});
			return ;
		}
		BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, (err, theInstance) => {
			if (err) { return next(err); }
			res.redirect(theInstance.url);
		});
	}
]

module.exports.bookinstance_delete_get = (req, res, next) => {
	BookInstance.findById(req.params.id)
		.populate('book').exec((err, instance) => {
			if (err) { return next(err); }
			res.render('bookinstance_delete', { instance: instance });
		});
};

module.exports.bookinstance_delete_post = (req, res, next) => {
	BookInstance.findByIdAndRemove(req.body.id).exec((err) => {
		if (err) { return next(err); }
		res.redirect('/catalog/bookinstances');
	});
};

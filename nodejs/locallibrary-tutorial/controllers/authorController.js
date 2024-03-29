const async = require('async');
const validator = require('express-validator');

const Author = require('../models/author');
const Book = require('../models/book');

module.exports.author_list = (req, res, next) => {
	Author.find({}).exec((err, author_list) => {
		if (err) { return next(err); }
		author_list.sort((a1, a2) => a1.family_name.localeCompare(a2.family_name));
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
	res.render('author_form', { title: 'Create Author' });
};

module.exports.author_create_post = [
	validator.body('first_name')
		.trim()
		.isLength({ min: 1 }).withMessage('First name must be specified')
		.isAlphanumeric().withMessage('First name has non-alphanumeric characters'),
	validator.body('family_name')
		.trim()
		.isLength({ min: 1}).withMessage('Family name is required as well')
		.isAlphanumeric().withMessage('Family name has non-alphanumeric charactrers'),
	validator.body('date_of_birth')
		.optional({ checkFalsy: true }).isISO8601().withMessage('Invalid date of birth'),
	validator.body('date_of_death')
		.optional({ checkFalsy: true }).isISO8601().withMessage('Invalid date of death'),
	validator.sanitizeBody('first_name').escape(),
	validator.sanitizeBody('family_name').escape(),
	validator.sanitizeBody('date_of_birth').escape(),
	validator.sanitizeBody('date_of_death').escape(),
	(req, res, next) => {
			const errors = validator.validationResult(req);
		if (!errors.isEmpty()) {
			res.render('author_form', {
				title: 'Create Author', author: req.body, errors: errors.array() });
			return ;
		}
		const author = new Author({
			first_name: req.body.first_name, family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death });
		author.save((err) => {
			if (err) { return next(err); }
			res.redirect(author.url);
		})
	}
];

module.exports.author_update_get = (req, res, next) => {
	Author.findById(req.params.id).exec((err, theAuthor) => {
		if (err) { return next(err); }
		res.render('author_form', { title: 'Update Author', author: theAuthor });
	});
};

module.exports.author_update_post = [
	validator.body('first_name').trim().isLength({ min: 1 }).withMessage('First name required').escape(),
	validator.body('family_name').trim().isLength({ min: 1}).withMessage('Family name required').escape(),
	validator.body('date_of_birth').optional({ checkFalsy: true })
		.isISO8601().withMessage('Invalid date of death'),
	validator.body('date_of_death').optional({ checkFalsy: true })
		.isISO8601().withMessage('Invalid date of death'),
	(req, res, next) => {
		const errors = validator.validationResult(req);
		const author = new Author({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
			_id: req.params.id
		});
		if (!errors.isEmpty()) {
			res.render('author_form', {
				title: 'Update Author', author: author, errors: errors.array() });
			return ;
		}
		Author.findByIdAndUpdate(req.params.id, author, {}, (err, theauthor) => {
			if (err) { return next(err); }
			res.redirect(theauthor.url);
		});
	}
];

module.exports.author_delete_get = (req, res, next) => {
	async.parallel({
		author: (cb) => Author.findById(req.params.id).exec(cb),
		book_list: (cb) => Book.find({ 'author': req.params.id }).exec(cb)
	}, (err, results) => {
		if (err) { return next(err); }
		res.render('author_delete', {
			author: results.author,
			books: results.book_list });
	});
};

module.exports.author_delete_post = (req, res, next) => {
	Author.findByIdAndRemove(req.body.id, (err) => {
		if (err) { return next(err); }
		res.redirect('/catalog/authors');
	});
};

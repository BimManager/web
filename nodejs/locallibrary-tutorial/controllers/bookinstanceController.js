const BookInstance = require('../models/bookinstance');

module.exports.bookinstance_list = (req, res, next) => {
	BookInstance.find({})
		.populate('book')
		.exec((err, bookinstance_list) => {
			if (err) { return next(err); }
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

module.exports.bookinstance_create_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance create GET');
};

module.exports.bookinstance_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance create POST');
};

module.exports.bookinstance_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance update GET');
};

module.exports.bookinstance_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance update POST');
};

module.exports.bookinstance_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance delete GET');
};

module.exports.bookinstance_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Bookinstance delete POST');
};

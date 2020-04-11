const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const mongoose = require('mongoose');

const config = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const app = express();
mongoose.connect(config.db.mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* middlewares */
app.use(express.static(path.join(__dirname, 'public')));

/* route handlers */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ?
		err : {};

	res.status(err.status || 500);
	res.send(err.stack);
//	res.render('error');
});

app.listen(config.port, () => {
	process.stdout.write(`Listening on port ${config.port}...\n`);
});

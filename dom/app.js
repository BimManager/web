const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${app.get('port')}`);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/api')
    .get((req, res) => {
        console.log(req.body);
        res.json({ status: 'OK' });
    })
    .post((req, res) => {
        console.log(req.headers);
        console.log(req.body);
        //res.setHeader('Location', '/api');
        res.json({ status: 'Created' });
    });


app.all('*', (req, res) => {
    res.json({ statusCode: 404, statusText: 'Not Found' });
});

app.use((err, req, res, next) => {
    if (err) {
        console.log(err);
        res.json({ Error: 'Server Error' });
    }
});

const server = app.listen(app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'));
});

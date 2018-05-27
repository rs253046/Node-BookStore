var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Book = require('./models/bookModel');
var mongoose = require('mongoose');
var db;

if (process.env.ENV == 'Test')
    db = mongoose.connect('mongoose://localhost/bookApi_test');
else {
    db = mongoose.connect('mongodb://localhost/books');
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var bookRouter = require('./routes/bookRoute')(Book);

app.use('/api/books', bookRouter);
// app.use('/api/author', authorRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my Api!!')
});

app.listen(port, function() {
    console.log('Gulp is running my app on PORT:', port);
});

module.exports = app;

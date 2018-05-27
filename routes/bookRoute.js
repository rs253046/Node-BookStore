var express = require('express');
var routes = function(Book) {
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    bookRouter.use('/:bookId', bookController.middleware);

    bookRouter.route('/:bookId')
        .get(function(req, res) {
            var returnBook = req.books.toJSON();
            returnBook.links = {};
            returnBook.links.filterByThisTitle = 'http://' + req.headers.host + '/api/books/?title=' +
                returnBook.title

            res.json(returnBook);
        })

    .put(bookController.put)

    .patch(bookController.patch)

    .delete(bookController.deleteReq);

    return bookRouter;

};

module.exports = routes;

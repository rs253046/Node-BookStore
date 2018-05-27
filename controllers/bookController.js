var bookController = function(Book) {
    var post = function(req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201)
            res.send(book);
        }
    };

    var get = function(req, res) {
        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre
        }

        Book.find(query, function(err, books) {
            if (err) {
                // console.log(err);
                res.status(500).send(err);
            }
            var returnBook = [];
            books.forEach(function(element, index, array) {
                var newBook = element.toJSON();
                newBook.links = {
                    self: 'http://' + req.headers.host + '/api/books/'
                    +newBook._id
                };
                returnBook.push(newBook);

            });
            res.json(returnBook);
        });
        // var responseJson = {
        //     hello: 'This is my APi'
        // };
        // res.json(responseJson);    
    };

    var put = function(req, res) {
        req.books.title = req.body.title;
        req.books.author = req.body.author;
        req.books.read = req.body.read;
        req.books.genre = req.body.genre;
        req.books.save();
        res.json(req.books);
    };

    var patch = function(req, res) {
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body) {
            req.books[p] = req.body[p];
        }

        req.books.save();
        res.json(req.books);
    };

    var middleware = function(req, res, next) {
        Book.findById(req.params.bookId, function(err, books) {
            if (err) {
                res.status(500).send(err);
            } else if (books) {
                req.books = books;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    };

    var deleteReq = function(req, res) {
        req.books.remove();
        res.status(204).send('Removed');
    };

    return {
        post: post,
        get: get,
        middleware: middleware,
        put: put,
        patch: patch,
        deleteReq: deleteReq
    }
};

module.exports = bookController;

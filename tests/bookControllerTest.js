var should = require('should');
var sinon = require('sinon');

describe('Book Controller Function', function() {
    describe('Post', function() {
        it('should not allow empty title on post', function() {
            var book = function(book) {
                this.save = function() {};
            };

            var req = {
                body: {
                    author: 'John'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var bookController = require('../controllers/bookController')(book);
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    })
});

const router = require('express').Router();
const multipart = require('connect-multiparty');
//controllers
const User = require('../controllers/user');
const Book = require('../controllers/book');
const Loan = require('../controllers/loan');
const multipartMiddleware = multipart({uploadDir:'./src/image'});
//Resources-endPoints:

//books
router.post('/books', Book.create);
router.get('/books/:idBook?', Book.read);
router.put('/books/:idBook', Book.update);
router.delete('/books/:idBook', Book.delete);

router.get('/books/get-image/:imageBook', Book.getImage);
router.post('/books/upload-image/:idBook', multipartMiddleware, Book.uploadImage);
//loans
router.post('/loans', Loan.create);
router.get('/loans', Loan.read);
router.put('/loans/:idBook/close',Loan.update);
//Users
router.post('/users', User.create);
router.get('/users/:idUser?', User.read);
router.put('/users/:idUser?', User.update);
router.delete('/users/:idUser', User.delete);
//router.get('/users/:identification?', User.read);
router.post('/users/:datoPrueba', User.create);


module.exports = router;
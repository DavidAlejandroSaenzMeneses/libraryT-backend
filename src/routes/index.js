const router = require('express').Router();

//controllers
const User = require('../controllers/user');
const Book = require('../controllers/book');
const Loan = require('../controllers/loan');

//Resources-endPoints:

//books
router.get('/books/:idBook?', Book.read);
router.get('/books/get-image/:imageBook', Book.getImage);
//loans
router.post('/loans', Loan.create);
//Users
router.post('/users', User.create);
router.get('/users/:idUser?', User.read);
router.put('/users/:idUser?', User.update);
//router.get('/users/:identification?', User.read);
router.post('/users/:datoPrueba', User.create);


module.exports = router;
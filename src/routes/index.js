const router = require('express').Router();

//controllers
const User = require('../controllers/user');
const Author = require('../controllers/author');
const Book = require('../controllers/book');
const Genre = require('../controllers/genre');
const PublishingHouse = require('../controllers/publishing_house');

//Resources-endPoints:
//Authors
router.get('/authors/:idAuthor?', Author.read);
//books
router.get('/books/:idBook?', Book.read);
router.get('/books/get-image/:imageBook', Book.getImage);
//Genres
router.get('/genres/:idGenre?', Genre.read);
//loans

//Publishing Hose
router.get('/publishing-houses/:idPublishingHouse?', PublishingHouse.read);
//Users
router.get('/users/:identification?', User.read);
router.post('/users/:datoPrueba', User.create);


module.exports = router;
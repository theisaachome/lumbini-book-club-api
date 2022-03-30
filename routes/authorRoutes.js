const express = require('express');
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor, getAuthor } = require('../controllers/authorController');
const { requiredSignin } = require('../middlewares/authMiddleware');
const router = express.Router();

// include other resources routes.
const booksRoutes = require('./bookRoutes');

// re-route into other resource routers
router.use("/:authorId/books",booksRoutes);

router.route('/')
    .get(getAllAuthors)
    .post(requiredSignin,addAuthor);

router.route('/:id')
    .get(getAuthor)
    .put(requiredSignin,updateAuthor)
    .delete(requiredSignin,deleteAuthor)


module.exports = router;
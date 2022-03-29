const express = require('express');
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor, getAuthor } = require('../controllers/authorController');
const { requiredSignin } = require('../middlewares/authMiddleware');
const router = express.Router();

const booksRoutes = require('./bookRoutes');


router.use("/:authorId/books",booksRoutes);

router.route('/')
    .get(getAllAuthors)
    .post(requiredSignin,addAuthor);

router.route('/:id')
    .get(getAuthor)
    .put(requiredSignin,updateAuthor)
    .delete(requiredSignin,deleteAuthor)


module.exports = router;
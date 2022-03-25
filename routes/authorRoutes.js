const express = require('express');
const { getAllAuthors, addAuthor, updateAuthor, deleteAuthor, getAuthor } = require('../controllers/authorController');
const router = express.Router();


router.route('/')
    .get(getAllAuthors)
    .post(addAuthor);

router.route('/:id')
    .get(getAuthor)
    .put(updateAuthor)
    .delete(deleteAuthor)


module.exports = router;
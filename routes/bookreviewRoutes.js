const express = require('express');
const { getAllBookReview, addBookReview, getBookReview, updateBookReview, deleteBookReview } = require('../controllers/bookReviewController');
const { requiredSignin } = require('../middlewares/authMiddleware');
const router = express.Router({mergeParams:true});


router.route("/")
    .get(getAllBookReview)
    .post(requiredSignin,addBookReview);
router.route("/:id")
    .get(getBookReview)
    .put(requiredSignin,updateBookReview)
    .delete(requiredSignin,deleteBookReview);

module.exports = router;
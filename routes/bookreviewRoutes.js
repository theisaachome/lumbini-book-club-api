const express = require('express');
const { getAllBookReview, addBookReview } = require('../controllers/bookReviewController');
const { requiredSignin } = require('../middlewares/authMiddleware');
const router = express.Router({mergeParams:true});


router.route("/")
    .get(getAllBookReview)
    .post(requiredSignin,addBookReview);

module.exports = router;

const express = require("express");
const { 
    getAllBooks, 
    createBook, 
    getBook, 
    updateBook, 
    deleteBook } = require("../controllers/bookController");
const { requiredSignin } = require("../middlewares/authMiddleware");
const bookReviewRoutes = require('./bookreviewRoutes');
const router = express.Router();

router.use("/:bookid/bookreviews",bookReviewRoutes);

router.route("/").get(getAllBooks).post(requiredSignin,createBook);
router.route("/:id").get(getBook).put(requiredSignin,updateBook).delete(requiredSignin,deleteBook);

module.exports = router;
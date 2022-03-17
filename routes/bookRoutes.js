
const express = require("express");
const { getAllBooks, createBook, getBook, updateBook, deleteBook } = require("../controllers/bookController");
const { requiredSignin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.route("/").get(getAllBooks).post(requiredSignin,createBook);
router.route("/:id").get(getBook).put(requiredSignin,updateBook).delete(requiredSignin,deleteBook);

module.exports = router;
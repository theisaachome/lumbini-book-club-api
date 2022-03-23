
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const BookReview = require('../models/BookReview');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get Bookreviews
// @route     GET /api/v1/bookreviews
// @access    Public
exports.getAllBookReview = asyncHandler(async (req, res, next) => {
    const bookReviews = await BookReview.find().sort('createdAt');
    res.status(200).json(
        {
            status: true,
            count: bookReviews.length,
            data: bookReviews,
        });
});



// @desc      Get Bookreviews
// @route     GET /api/v1/bookreviews/:id
// @access    Public
exports.getBookReview = asyncHandler(async (req, res, next) => {
    const bookReview = await BookReview.findById(req.params.id);
    if (!bookReview) return next(new ErrorResponse(`There is no bookreview with id ${req.params.id}`, 404));
    res.status(200).json(
        {
            status: true,
            data: bookReview,
        });
})


// @desc      Get Bookreviews
// @route     GET /api/v1/bookreviews/:id
// @access    Public
exports.getBookReview = asyncHandler(async (req, res, next) => {
    const bookReview = await BookReview.findById(req.params.id);
    if (!bookReview) return next(new ErrorResponse(`There is no bookreview with id ${req.params.id}`, 404));
    res.status(200).json(
        {
            status: true,
            data: bookReview,
        });
})



// @desc      Add  Bookreviews (from The Store)
// @route     GET /api/v1/books/:bookid/bookreviews
// @access    Public
exports.addBookReview = asyncHandler(async(req,res,next)=>{
    req.body.book = req.params.bookid;
    req.body.createdBy = req.user.id;
    const book = await Book.findById(req.params.bookid);
    if(!book)return next(new ErrorResponse(`There is no book with id : ${req.params.bookid}`,404));

    const bookreview = await BookReview.create(req.body);
    res.status(201).json({
        success: true,
        data: bookReview
    });
})




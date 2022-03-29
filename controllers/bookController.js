const  asyncHandler=require('express-async-handler');
const Book = require('../models/Book');
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get books
// @route     GET /api/v1/books
// @route     GET /api/v1/authors/:authorId/books
// @access    Public
const getAllBooks= asyncHandler(async(req,res,next)=>{
    if(req.params.authorId){
        const books = await Book.find({author:req.params.authorId});
        res.status(200).json({
            success:true,
            count:books.length,
            data:books
        });
    }else{
        res.status(200).json(res.advancedResults);
    }
});

// @desc      Get single book
// @route     GET /api/v1/books/:id
// @access    Public
const getBook =asyncHandler(async(req,res,next)=>{
    const book = await Book.findById(req.params.id).populate(
        {
            path:"author",
            select:"name"
        }
    );
    if(!book){
        return next(
            new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        status:true,
        data:book
    });
});


// @desc      Add books
// @route     POST /api/v1/books
// @route     POST /api/v1/authors/:authorId/books
// @access    Private
const createBook = asyncHandler(async(req,res,next)=>{
    const book = await Book.create(req.body);
    res.status(201).json({
       status:true,
       data:book,
    })
});

// @desc      Update books
// @route     PUT /api/v1/books
// @route     PUT /api/v1/authors/:authorId
// @access    Private
const updateBook = asyncHandler(async(req,res,next)=>{
    let book = await Book.findById(req.params.id);
    if(!book){
        return next(
            new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure login user  role  is right
    if (req.user.role !== 'admin') {
        return next(
        new ErrorResponse(
            `User ${req.user.id} is not authorized to update this resource ${book._id}`,
            403
        )
        );
    }

    book = await Book.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    })
    res.status(200).json({
        status:true,
        data:book,
    });
});


// @desc      Delete books
// @route     DELETE /api/v1/books
// @route     DELETE /api/v1/authors/:authorId
// @access    Private
const deleteBook = asyncHandler(async(req,res,next)=>{
    let book = await Book.findById(req.params.id);
    if(!book){
        return next(
            new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
        );
    }
    // Make sure login user  role  is right
    if (req.user.role !== 'admin') {
        return next(
        new ErrorResponse(
            `User ${req.user.id} is not authorized to delete this resource ${book._id}`,
            403
        )
        );
    }
    await book.remove();
    res.status(200).json({status:true,data:{}})
})

module.exports = {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
}
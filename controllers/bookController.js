const  asyncHandler=require('express-async-handler');
const Book = require('../models/Book');
const ErrorResponse = require('../utils/errorResponse');

// @route     GET /api/v1/bootcamps/:bootcampId/courses
const getAllBooks= asyncHandler(async(req,res,next)=>{

    res.status(200).json(res.advancedResults);
});
const getBook =asyncHandler(async(req,res,next)=>{
    const book = await Book.findById(req.params.id);
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
const createBook = asyncHandler(async(req,res,next)=>{
    const book = await Book.create(req.body);
    res.status(201).json({
       status:true,
       data:book,
    })
})
const updateBook = asyncHandler(async(req,res,next)=>{
    let book = await Book.findById(req.params.id);
    if(!book){
        return next(
            new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
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
const deleteBook = asyncHandler(async(req,res,next)=>{
    let book = await Book.findById(req.params.id);
    if(!book){
        return next(
            new ErrorResponse(`Book not found with id of ${req.params.id}`, 404)
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
const  asyncHandler=require('express-async-handler');
const Book = require('../models/Book');
const ErrorResponse = require('../utils/errorResponse');

const getAllBooks= asyncHandler(async(req,res,next)=>{

    
    let query ;
    // copy req Query 
    const reqQuery = {...req.query}

    // Fields to execlude
    const removeFields = ['select','sort','page','limit'];

    // loop over removeFields and delete them from the reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // create query String
    let queryStr = JSON.stringify(reqQuery);

    // Create Query operator ($gt, $gte $le $lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`);

    // Finding Resources
    query = Book.find(JSON.parse(queryStr)).populate('bookreview');
    // Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query =query.select(fields);
    }
    // Sorting by fields
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query.sort('-createdAt')
    }
    // pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 20;
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const total = await Book.countDocuments();
    query = query.skip(startIndex).limit(limit);

    // execute query
    const books = await query;
    // pagination result 
    const pagination={

    }
    if(endIndex < total){
        pagination.next={
            page:page+1,
            limit,
        }
    }
    if(startIndex > 0){
        pagination.prev={
            page:page-1,
            limit,
        }
    }

    res.status(200).json(
        {
            status:true,
            count:books.length,
            pagination,
            data:books,
        });
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
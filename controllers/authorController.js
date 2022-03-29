const asyncHandler = require('express-async-handler');
const Author = require("../models/Author");
const ErrorResponse = require('../utils/errorResponse');



// @desc      Get all Author
// @route     GET /api/v1/authors
// @access    Pulic
exports.getAllAuthors = asyncHandler(async(req,res,next)=>{
    const authors = await Author.find().sort("authorname");
    res.status(200).json({success:true,count:authors.length,data:authors});
})

// @desc      Get Author
// @route     GET /api/v1/authors/:id
// @access    Pulic
exports.getAuthor = asyncHandler(async(req,res,next)=>{
    res.send("response from end point")
})


// @desc      add a new author (admin)
// @route     POST /api/v1/authors/
// @access    Private
exports.addAuthor = asyncHandler(async(req,res,next)=>{
    const {email,authorname} = req.body;
    // check the email and paassword in request body
    if (!authorname) {
        return next(new ErrorResponse("Please provide an author name.", 400));
    };
    const author = await Author.create({authorname,email});

    res.status(200).json({
        success:true,
        data:author,
    })
})


// @desc      Update an author (admin)
// @route     POST /api/v1/authors/:id
// @access    Private
exports.updateAuthor = asyncHandler(async(req,res,next)=>{
    res.send("response from end point")
})



// @desc      Delete an author (admin)
// @route     POST /api/v1/authors/:id
// @access    Private
exports.deleteAuthor = asyncHandler(async(req,res,next)=>{
    res.send("response from end point")
});





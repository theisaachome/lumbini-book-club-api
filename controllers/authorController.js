const asyncHandler = require('express-async-handler');
const Author = require("../models/Author");
const ErrorResponse = require('../utils/errorResponse');



// @desc      Get all Author
// @route     GET /api/v1/authors
// @access    Pulic
exports.getAllAuthors = asyncHandler(async(req,res,next)=>{
    res.send("response from end point")
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
    res.send("response from end point")
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




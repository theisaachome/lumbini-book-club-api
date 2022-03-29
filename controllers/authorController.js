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
    const author = await Author.findById(req.params.id);
    if(!author)return next(new ErrorResponse(`There is no author with id${req.params.id}`));

    res.status(200).json({
        success:true,
        data:author,
    })
})


// @desc      add a new author (admin)
// @route     POST /api/v1/authors/
// @access    Private
exports.addAuthor = asyncHandler(async(req,res,next)=>{
    const {email,name,bio,isActive,rating} = req.body;
    // check the email and paassword in request body
    if (!name) {
        return next(new ErrorResponse("Please provide an author name.", 400));
    };
    const author = await Author.create({
        name,
        bio,
        isActive,
        email,
        rating,
    });

    res.status(200).json({
        success:true,
        data:author,
    })
})


// @desc      Update an author (admin)
// @route     POST /api/v1/authors/:id
// @access    Private
exports.updateAuthor = asyncHandler(async(req,res,next)=>{
    let author = await Author.findById(req.params.id);
    if(!author)return next(new ErrorResponse(`Author not found with id ${req.params.id}`,404));
    if(req.user.role !=="admin"){
        return next(new ErrorResponse(
            `User ${req.user.id} is not authorized to update this resource.`,
            403
        ))
    }
    author = await Author.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    })
    res.status(200).json({success:true,data:author});
})



// @desc      Delete an author (admin)
// @route     POST /api/v1/authors/:id
// @access    Private
exports.deleteAuthor = asyncHandler(async(req,res,next)=>{
    res.send("response from end point")
});





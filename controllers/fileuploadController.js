
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const csv = require('fast-csv');

// @desc      Upload csv file for book
exports.uploadBooksCSVFile = asyncHandler(async(req,res,next)=>{

    // console.log(req);
    // if(req.file ===undefined)return next(new ErrorResponse(`Please upload only csv file.`,400));

    res.send("file upload routes");
});
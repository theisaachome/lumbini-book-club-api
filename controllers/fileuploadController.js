
const asyncHandler = require("express-async-handler");
// @desc      Upload photo for bootcamp
// @route     PUT /api/v1/bootcamps/:id/photo
// @access    Private

exports.uploadBooksCSVFile = asyncHandler(async(req,res,next)=>{
    console.log(req.file);
    res.send("file upload routes");
});
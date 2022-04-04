const  asyncHandler= require('express-async-handler');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');

exports.getAllCategories = asyncHandler(async(req,res,next)=>{
    const categories = await Category.find().sort('name');
    res.status(200).json({
        success:true,
        count:categories.length,
        data:categories,
    });
})


exports.getCategory = asyncHandler(async(req,res,next)=>{
    const category = await Category.findById(req.params.id);
    if(!category)return next(new ErrorResponse(`There is no category with id ${req.params.id}`,404));
    res.status(200).json({
        success:true,
        data:category,
    });
})
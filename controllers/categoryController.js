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
});

exports.addCategory = asyncHandler(async(req,res,next)=>{
    const {name} = req.body.name;
    if(!name)return next(new ErrorResponse(`Please add a name for category.`));

    const category = await Category.create({name});
    if(!category) return next(new ErrorResponse(`Category can not be created now.`,400));
    res.status(201).json({
        success:true,
        data:category,
    });
})


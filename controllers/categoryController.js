const  asyncHandler= require('express-async-handler');
const Category = require('../models/Category');

exports.getAllCategories = asyncHandler(async(req,res,next)=>{
    const categories = await Category.find().sort('name');
    res.status(200).json({
        success:true,
        count:categories.length,
        data:categories,
    });
})
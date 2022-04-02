
const asyncHandler = require('express-async-handler');
const Customer = require('../models/Customer');
const ErrorResponse = require('../utils/errorResponse');

exports.getAllCustomers = asyncHandler(async(req,res,next)=>{
    const customers = await Customer.find().sort("name");
    res.status(200).json({
        success:true,
        count:customers.length,
        data:customers,
    });
});



exports.getCustomer = asyncHandler(async(req,res,next)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer)return next(new ErrorResponse(`There is no customer with id${customer}`,404));
    
    res.status(200).json({
        success:true,
        data:customer,
    })
});

//  create new customer from their order information
exports.addCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
});

exports.updateCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
});

exports.deleteCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
})

const asyncHandler = require('express-async-handler');
const Customer = require('../models/Customer');

exports.getAllCustomers = asyncHandler(async(req,res,next)=>{
    const customers = await Customer.find();
    res.send("Customer endpoints.");
});



exports.getCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
});

exports.updateCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
});

exports.deleteCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
})
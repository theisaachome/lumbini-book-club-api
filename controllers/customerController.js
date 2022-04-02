
const asyncHandler = require('express-async-handler');
const Customer = require('../models/Customer');

exports.getAllCustomers = asyncHandler(async(req,res,next)=>{
    const customers = await Customer.find().sort("name");
    res.status(200).json({
        success:true,
        count:customers.length,
        data:customers,
    });
});



exports.getCustomer = asyncHandler(async(req,res,next)=>{
    res.send("Customer endpoints.");
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
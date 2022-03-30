const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all new orders (admin)
// @route     GET /api/v1/orders
// @access    Private
exports.getAllNewOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find({status:"Pending"}).sort("-1 orderedDate")
    res.status(200).json({
        success:true,
        count:orders.length,
        data:orders,
        msg:"get all new Orders"
    })
})


// @desc      Get all orders (admin)
// @route     GET /api/v1/orders
// @access    Private
exports.getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find().sort("-1 orderedDate");
    res.status(200).json({

    })
    res.send("get all orders from past");
});


// @desc      Get an orders (admin)
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async(req,res,next)=>{
    const order= await Order.find(req.params.id);
    if(!order)return next(new ErrorResponse(`No Order is found with id ${req.params.id}`));
    res.status(200).json({
        success:true,
        data:order,
    })
});




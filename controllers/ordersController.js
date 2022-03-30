const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
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




// @desc      Create an orders (admin)
// @route     POST /api/v1/orders
// @access    Private
exports.createOrder = asyncHandler(async(req,res,next)=>{
    // order items
    const orderItemsIds = Promise.all(req.body.orderItems.map(
        async(orderItem)=>{
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product,
        })
    }))
});

// @desc      Get an orders (admin)
// @route     PUT /api/v1/orders/:id
// @access    Private
exports.updateOrder = asyncHandler(async(req,res,next)=>{
    const order = await Order.findByIdAndUpdate(req.params.id,
        {status:req.body.status},
        {
            new:true
        });
        if(!order)return next(ErrorResponse(`There is no order with id ${req.params.id}`));
        res.status(200).json({
            success:true,
            data:order
        })
})



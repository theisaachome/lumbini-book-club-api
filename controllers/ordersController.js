const asyncHandler = require("express-async-handler");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// @desc      Get all new orders (admin)
// @route     GET /api/v1/orders
// @access    Private
exports.getAllNewOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find({status:"Pending"}).sort("-1 orderedDate")
    .populate({
        path:"customer",
        select:"name"
    })
    res.status(200).json({
        success:true,
        count:orders.length,
        data:orders,
    })
})


// @desc      Get all orders (admin)
// @route     GET /api/v1/orders/all
// @access    Private
exports.getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders = await Order.find().sort("-1 orderedDate");
    res.status(200).json({
        success:true,
        count:orders.length,
        data:orders,
    });
});


// @desc      Get an orders (admin)
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrder = asyncHandler(async(req,res,next)=>{
    const order= await Order.findById(req.params.id)
    .populate({
        path:"orderItems",
        populate: {
            path: "book",
            select:"title"
          },
    })
    .populate({
        path:"customer",
        select:"name"
    });
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
            quantity: orderItem.quantity,
            book: orderItem.book,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }));
    const orderItemsIdsResolved = await orderItemsIds;

    // destructor request body
    const {
        customerName,
        email,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone} = req.body;

    //  total price
    const totalPrices =await Promise.all(
        orderItemsIdsResolved.map(async(orderItemId)=>{
            const orderItem = await OrderItem.findById(orderItemId)
             .populate("book","price");
             const totalPrice = orderItem.book.price * orderItem.quantity;
             return totalPrice;
        
        })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    //  look for customer with email 
    //  if no customer then create new record for customer 
    //  if customer then do nth
    let customer = await Customer.findOne({email});
    if(!customer){
       customer =  await Customer.create({
           name:customerName,
           email,
           shippingAddress1,
           shippingAddress2,
           city,
           zip,
           country,
           phone,
       });
    }
    
  
  let order = new Order({
    orderItems: orderItemsIdsResolved,
    customer,
    email,
    shippingAddress1,
    shippingAddress2,
    city,
    zip,
    country,
    phone,
    totalPrice,
  });
  order = await order.save();
  if(!order) return next(new ErrorResponse(`The order can not be created`,400));


  const message = `
        ${customerName}, thank you for your order!
        We've received your order and will contact you soon 
        as soon as the package is shipped.
        You can your purchase information below.
  `;

  const sendResult = await sendEmail({
    email:email,
    subject: 'Order Confirmation',
    message,
  });
  res.status(200).json({
      success:true,
      msg:"Orders have been placed.Pleas check your email for comfirmation"
  })
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


// @desc      Delete an orders (admin)
// @route     Delete /api/v1/orders/:id
// @access    Private
exports.deleteOrder = asyncHandler(async(req,res,next)=>{
    const order = await  Order.findByIdAndDelete(req.params.id);
    if(order){
        await order.orderItems.map(async (orderItem) => {
            await OrderItem.findByIdAndRemove(orderItem);
          });
          return res
            .status(200)
            .json({ success: true, message: "the order is deleted!" });
    }
    else{
        return next(new ErrorResponse(`Order not found with id ${req.params.id}`,404));
    }
})



// @desc      Monthly / weekly / all time Sales (admin)
// @route     Get /api/v1/orders/totalSales
// @access    Private
exports.getTotalSales =asyncHandler(async (req, res,next) => {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ]);
  
    if (!totalSales) {
      return next(new ErrorResponse(`The order sales cannot be generated`,400));
    }
    res.status(200).json({ totalsales: totalSales.pop().totalsales });
});
  

// @desc      Monthly / weekly / all time count  orders (admin)
// @route     Delete /api/v1/orders/counts
// @access    Private
  exports.getOrderCount =asyncHandler(async (req, res,next) => {
    const orderCount = await Order.countDocuments();
    if (!orderCount) {
      return next(new ErrorResponse("Can't generate Total Orders",400));
    }
    res.status(200).json({ success: true,totalOrders:orderCount, });
});
  
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    orderItems :[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"OrderItem",
            required:true,
    }],
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    shippingAddress1:{
        type:String,
        required:true,
    },
    shippingAddress2:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: {
          values: ['Pending', 'Shipped','Process'],
          message: '{VALUE} is not supported'
        },
        default:"Pending"
    },
    totalPrice:{
        type:Number,
    },
    orderedDate:{
        type:Date,
        default:Date.now,
    }
    
})
module.exports = mongoose.model("Order",OrderSchema);
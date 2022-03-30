const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    orderItems :[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"OrderItem",
            required:true,
    }],
    
})
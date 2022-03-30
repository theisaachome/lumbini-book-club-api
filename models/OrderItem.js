const mongoose = require("mongoose");

const OrderItemSchema = mongoose.Schema({
   quantity:{
       type:Number,
       required:true,
       default:0,
   },
   product:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Book"
   }
});
module.exports = mongoose.model("OrderItem",OrderItemSchema);
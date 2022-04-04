const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a  name."],
    }
})
module.exports = mongoose.model("Category",CategorySchema)
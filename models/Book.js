const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a book title'],
        trim: true,
        maxlength: [100, 'Name can not be more than 50 characters']
    },
    slug: String,
    price:{
        type:Number,
        required:[true,"Please add a book price"],
        min:[0,'Please add right price for a book'],
        default:0,
    },
    inStock:{
        type:Number,
        mim:[1,"Please add instock number for a book"],
        default:0,
    },
    publisher:{
        type:String,
        default:"unknown"
    },
    author:{
        type:String,
        default:"unknown"
    }
});
module.exports = mongoose.model("Book",BookSchema);
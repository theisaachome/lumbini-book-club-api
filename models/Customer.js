const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phone:{
        type: String,
        required: [true, 'Please add an email'],
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
},{
    timestamps:true
})

module.exports = mongoose.model('Customer',CustomerSchema);
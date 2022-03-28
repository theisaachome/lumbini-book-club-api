const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema(
    {
    authorname: {
        type: String,
        required: [true, 'Please add an author name'],
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    isActive:{
       type: Boolean,
       default:true,
    }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Author',AuthorSchema);
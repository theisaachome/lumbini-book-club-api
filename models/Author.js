const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, 'Please add an author name'],
        minlength: [3,'Please add a real name of author.'],
    },
    bio: {
        type: String,
        max: [200,'Maxlenght 200 for author biography.'],
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    gender:{
        type:String,
        default:"",
    },
    isActive:{
       type: Boolean,
       default:true,
    },
    ratings:{
        type:Number,
        default:0,
    },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    },
    {
        timestamps: true
    }
);

// Reverse populate with virtuals
AuthorSchema.virtual('books', {
    ref: 'Author',
    localField: '_id',
    foreignField: 'author',
    justOne: false
});
  
module.exports = mongoose.model('Author',AuthorSchema);
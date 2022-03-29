const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a book title'],
        trim: true,
        maxlength: [100, 'Name can not be more than 50 characters']
    },
    slug: String,
    price: {
        type: Number,
        required: [true, "Please add a book price"],
        min: [0, 'Please add right price for a book'],
        default: 0,
    },
    inStock: {
        type: Number,
        mim: [1, "Please add instock number for a book"],
        default: 0,
    },
    publisher: {
        type: String,
        default: "unknown"
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author',
        required:[true,'Please add author for a book and can not be empty author.']
    }
    },
    {
        timestamps: true
    },
    {
        // for reverse population which are persist in datatbase.
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
);

// Cascade delete bookreview when a book is deleted
BookSchema.pre('remove', async function(next) {
    console.log(`Bookreview being removed from Book ${this._id}`);
    await this.model('BookReview').deleteMany({ book: this._id });
    next();
});
  
// reverse populate with virtuals
BookSchema.virtual('bookreview',{
    ref:"BookReview",
    localField:"_id",
    foreignField:"book",
    justOne:false,
})
module.exports = mongoose.model("Book", BookSchema);
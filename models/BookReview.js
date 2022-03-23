const mongoose = require('mongoose');

const BookReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
    required: true
  }
},{
    timestamps:true
});


module.exports = mongoose.model('BookReview', BookReviewSchema);

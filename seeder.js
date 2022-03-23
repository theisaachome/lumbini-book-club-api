const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv').config();

// Load env vars
// dotenv.config({ path: './config/config.env' });

//  load model
const Book = require('./models/Book');


mongoose.connect(process.env.MONGO_URL_LOCAL,()=>{});

// read json files
const books = JSON.parse(fs.readFileSync("./_data/book.json",'utf-8'));
// import data
const importData = async()=>{
    try {
        await Book.create(books);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// delete data


// Delete data
const deleteData = async () => {
    try {
      await Book.deleteMany();
      console.log('Data Destroyed...'.red.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  


if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }
  
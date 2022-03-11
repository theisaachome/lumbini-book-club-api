const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
connectDB();
const PORT = process.env.PORT ||8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Mount routes files
const books = require('./routes/bookRoutes');

app.use("/api/v1/books",books);


app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`.green.underline.bold);
});
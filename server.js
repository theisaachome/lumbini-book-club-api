const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
connectDB();
const PORT = process.env.PORT ||8000;

app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`.green.underline.bold);
});
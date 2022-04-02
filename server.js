const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cookieParser= require('cookie-parser');
const app = express();
const connectDB = require("./config/db");
connectDB();
const PORT = process.env.PORT ||8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

// Mount routes files
const books = require('./routes/bookRoutes');
const auths =require('./routes/authRoutes');
const users = require('./routes/userRoutes');
const bookreviews = require('./routes/bookreviewRoutes');
const authors = require('./routes/authorRoutes');
const orders = require("./routes/orderRoutes");
const customers = require('./routes/customerRoutes');

app.use("/api/v1/books",books);
app.use("/api/v1/auth",auths);
app.use("/api/v1/users",users);
app.use("/api/v1/bookreviews",bookreviews);
app.use("/api/v1/authors",authors);
app.use("/api/v1/orders",orders);
app.use("/api/v1/customers",customers);


// error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const server =app.listen(PORT,()=>{
    console.log(`Server started on ${PORT}`.green.underline.bold);
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    // server.close(() => process.exit(1));
});
  
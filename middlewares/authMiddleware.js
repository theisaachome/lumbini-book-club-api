
const asyncHandler = require("express-async-handler");
const Account = require('../models/Account');
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

// to protect our resource with token

exports.requiredSignin = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        // verify token
        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded.id);
        const user = await Account.findById(decoded.id);
        console.log(user);
        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

})
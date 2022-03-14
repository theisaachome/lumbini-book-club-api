const asyncHandler = require("express-async-handler");
const Account = require("../models/Account");
const ErrorResponse = require("../utils/errorResponse");
// add new user 

// @desc      add a new user
// @route     POST /api/v1/auth/users
// @access    Public
exports.addUser = asyncHandler(async(req,res,next)=>{
    const {username,email,password,role}=req.body;
    const exisitingAccount = await Account.findOne({email});
    if(exisitingAccount)return next(new ErrorResponse("Email has been used for account.Please use other",400));

    // create account for user
    let account = await Account.create({
        username,
        email,
        password,
        role,
    })

    res.status(201).json(account);
})
//  login with account

exports.loginUser = asyncHandler(async(req,res,next)=>{})


// logout

exports.logout = asyncHandler(async(req,res,next)=>{})

// get logined User

exports.getMe = asyncHandler(async(req,res,next)=>{})
// update detail


exports.updateDetail = asyncHandler(async(req,res,next)=>{})
//  reset Password


exports.resetPassword = asyncHandler(async(req,res,next)=>{})
// forget password

exports.forgetPassword = asyncHandler(async(req,res,next)=>{})

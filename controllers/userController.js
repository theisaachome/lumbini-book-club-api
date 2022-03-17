
const asyncHandler = require('express-async-handler');
const Account = require("../models/Account");
const ErrorResponse = require('../utils/errorResponse');
//  for admin
// manage users
// disable user account
// manage user role



// @desc      add a new user
// @route     POST /api/v1/auth/users
// @access    Public
exports.getAllUser = asyncHandler(async(req,res,next)=>{
    const accounts = await Account.find();
    res.status(200).json({success:true,data:accounts});
})

// @desc      add a new user
// @route     POST /api/v1/auth/users
// @access    Public
exports.addNewUser = asyncHandler(async(req,res,next)=>{
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
    // send invitation link to confirm the email address.

    res.status(201).json({
        status:true,
        "msg":"New user successfully created"
    });
});

exports.getUser=asyncHandler(async(req,res,next)=>{
    const user = await Account.findById(req.params.id);
    if(!user){
        return next(new ErrorResponse("There is no user ",404));
    }
    res.status(200).json({
        success:true,
        data:user,
    })
});
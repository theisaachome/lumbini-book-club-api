const asyncHandler = require("express-async-handler");
const Account = require("../models/Account");
const ErrorResponse = require("../utils/errorResponse");
const { sendTokenResponse } = require("../utils/sendTokenResponse");


// @desc      add a new user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async(req,res,next)=>{
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

    // confirm email 
    sendTokenResponse(account,200,res);    
})

//  login with account
exports.login = asyncHandler(async(req,res,next)=>{
    const {email,password} = req.body;

    // check the email and paassword in request body
    if(!email || !password){
        return next(new ErrorResponse("Please provide and email and password.",400));
    }
    // look for a  account with email 
    const account = await Account.findOne({email}).select("+password");
    if(!account)return next(new ErrorResponse("Invalid Credential",401));

    const isMatch = await account.matchPassword(password);
    if(!isMatch) return next(new ErrorResponse("Invalid Crendtial",401));

    sendTokenResponse(account,200,res);
})


// logout

exports.logout = asyncHandler(async(req,res,next)=>{})

// get logined User

exports.getMe = asyncHandler(async(req,res,next)=>{
    const account = await Account.findById(req.user._id);
    res.status(200).json(
        {status:true,account}
    )
})


// @desc      forgot passwordd
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async(req,res,next)=>{
    // find User with Email
    const account = await Account.findOne({email:req.body.email});
    if(!account) {
        return next(new ErrorResponse(`There is no an account with ${account}`,404));
    }
    // Get Reset Token 
    const resetToken  = account.getResetPasswordToken();

    await account.save({validateBeforeSave:false});
    
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  
})



// update detail
exports.updateDetail = asyncHandler(async(req,res,next)=>{})
//  reset Password


exports.resetPassword = asyncHandler(async(req,res,next)=>{})
// forget password

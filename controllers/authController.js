const asyncHandler = require("express-async-handler");
const crypto=require("crypto");
const Account = require("../models/Account");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const { sendTokenResponse } = require("../utils/sendTokenResponse");


// @desc      add a new user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;
    const exisitingAccount = await Account.findOne({ email });
    if (exisitingAccount) return next(new ErrorResponse("Email has been used for account.Please use other", 400));

    // create account for user
    let account = await Account.create({
        username,
        email,
        password,
        role,
    })
    // send invitation link to confirm the email address.

    // confirm email 
    sendTokenResponse(account, 200, res);
})

//  login with account
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check the email and paassword in request body
    if (!email || !password) {
        return next(new ErrorResponse("Please provide and email and password.", 400));
    }
    // look for a  account with email 
    const account = await Account.findOne({ email }).select("+password");
    if (!account) return next(new ErrorResponse("Invalid Credential", 401));

    const isMatch = await account.matchPassword(password);
    if (!isMatch) return next(new ErrorResponse("Invalid Crendtial", 401));

    sendTokenResponse(account, 200, res);
})


// logout

exports.logout = asyncHandler(async (req, res, next) => { })

// get logined User

exports.getMe = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.user._id);
    res.status(200).json(
        { status: true, account }
    )
})


// @desc      forgot passwordd
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    // find User with Email
    const account = await Account.findOne({ email: req.body.email });
    if (!account) {
        return next(new ErrorResponse(`There is no an account with ${account}`, 404));
    }
    // Get Reset Token 
    const resetToken = account.getResetPasswordToken();

    await account.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: account.email,
            subject: 'Password reset token',
            message,
        });
        res.status(200).json({ success: true, data: 'Email has been sent.' });
    } catch (err) {
        console.log(err);
        account.resetPasswordToken = undefined;
        account.resetPasswordExpire = undefined;

        await account.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }

})



// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetail = asyncHandler(async (req, res, next) => { 
    const fieldsToUpdate = {
        username:req.body.username,
        email:req.body.email,
    }
    const account = await Account.findByIdAndUpdate(req.user.id,fieldsToUpdate,{new:true,runValidators:true});

  res.status(200).json({
    success: true,
    data: account,
  });
})


// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const account = await Account.findById(req.user.id).select('+password');
  
    // Check current password
    if (!(await account.matchPassword(req.body.currentPassword))) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }
  
    account.password = req.body.newPassword;
    await account.save();
  
    sendTokenResponse(account, 200, res);
  });
  


// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Get hash token
   const  resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');
    
    const account = await Account.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });
    if(!account)return next(new ErrorResponse('Invalid Token'));

    // set password
    account.password = req.body.password;
    account.resetPasswordToken = undefined;
    account.resetPasswordExpire = undefined;

    await account.save();

    sendTokenResponse(account,200,res);
})

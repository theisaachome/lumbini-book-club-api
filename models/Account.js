const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const AccountSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        },
        status:{
            type:Boolean,
            default:true
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        confirmEmailToken: String,
        isEmailConfirmed: {
            type: Boolean,
            default: false,
        },
        twoFactorCode: String,
        twoFactorCodeExpire: Date,
        twoFactorEnable: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true
    }
);
// Encrypt password using bcrypt
AccountSchema.pre("save",async function(next){
    if(!this.isModified('password'))next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});
// Sign Jwt and return
AccountSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE,});
}
// Match user entered password to hashed password in database
AccountSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model('Account', AccountSchema);
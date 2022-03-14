const mongoose = require("mongoose");


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
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
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

module.exports = mongoose.model('Account', AccountSchema);
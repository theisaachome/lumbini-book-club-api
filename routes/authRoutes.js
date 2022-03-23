const express = require('express');
const { login, register, getMe, forgotPassword, resetPassword, updateDetail, updatePassword } = require('../controllers/authController');
const { requiredSignin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",requiredSignin,getMe);
router.post("/updatedetails",requiredSignin,updateDetail);
router.post("/updatepassword",requiredSignin,updatePassword);
router.post("/forgotpassword",forgotPassword);
router.post('/resetpassword/:resettoken',resetPassword);

module.exports = router;
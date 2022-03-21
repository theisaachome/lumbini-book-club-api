const express = require('express');
const { login, register, getMe, forgotPassword } = require('../controllers/authController');
const { requiredSignin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",requiredSignin,getMe);

router.post("/forgotpassword",forgotPassword);

module.exports = router;
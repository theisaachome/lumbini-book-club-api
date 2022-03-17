const express = require('express');
const { login, register, getMe } = require('../controllers/authController');
const { requiredSignin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/me",requiredSignin,getMe);

module.exports = router;
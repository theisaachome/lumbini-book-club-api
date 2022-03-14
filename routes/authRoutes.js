const express = require('express');
const { addUser } = require('../controllers/authController');

const router = express.Router();

router.post("/",addUser)

module.exports = router;
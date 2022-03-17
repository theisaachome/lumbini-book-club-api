
const express = require("express");
const { getUser, getAllUser } = require("../controllers/userController");
const router = express.Router();

router.get("/",getAllUser);
router.get('/:id',getUser);

module.exports =router;
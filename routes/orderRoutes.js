const express = require("express");
const { 
    createOrder, 
    getAllNewOrders, 
    getOrder, 
    updateOrder, 
    getAllOrders } = require("../controllers/ordersController");

const { requiredSignin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/history",getAllOrders);

router.route('/')
    .get(requiredSignin,getAllNewOrders)
    .post(requiredSignin,createOrder);

router.route("/:id")
    .get(requiredSignin,getOrder)
    .put(requiredSignin,updateOrder);
    // .delete(req);

module.exports = router;
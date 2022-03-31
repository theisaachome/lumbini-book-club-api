const express = require("express");
const { 
    createOrder, 
    getAllNewOrders, 
    getOrder, 
    updateOrder, 
    getAllOrders, 
    deleteOrder,
    getOrderCount,
    getTotalSales} = require("../controllers/ordersController");

const { requiredSignin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.get("/all",getAllOrders);
router.get("/counts",getOrderCount);
router.get("/totalsales",getTotalSales);

router.route('/')
    .get(requiredSignin,getAllNewOrders)
    .post(requiredSignin,createOrder);

router.route("/:id")
    .get(requiredSignin,getOrder)
    .put(requiredSignin,updateOrder)
    .delete(requiredSignin,deleteOrder);

module.exports = router;

const express = require('express');
const { 
    getAllCustomers, 
    addCustomer, 
    getCustomer, 
    updateCustomer, 
    deleteCustomer } = require('../controllers/customerController');
const { requiredSignin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.route("/")
    .get(requiredSignin,getAllCustomers)
    .post(requiredSignin,addCustomer);

router.route("/:id")
    .get(requiredSignin,getCustomer)
    .put(requiredSignin,updateCustomer)
    .delete(requiredSignin,deleteCustomer);

module.exports = router;


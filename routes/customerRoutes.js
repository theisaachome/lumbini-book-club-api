
const express = require('express');
const { getAllCustomers, addCustomer, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();


router.route("/")
    .get(getAllCustomers)
    .post(addCustomer);

router.route("/:id")
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);
    
module.exports = router;


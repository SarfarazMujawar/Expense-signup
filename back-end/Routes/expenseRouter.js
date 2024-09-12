const express = require('express')
const authToken = require('../Middleware/authToken');
const router = express.Router();
const {fetchExpense} = require('../Controller/ExpenseController');

//to fetch all transactions of user
router.get('/',authToken,fetchExpense);

module.exports = router;

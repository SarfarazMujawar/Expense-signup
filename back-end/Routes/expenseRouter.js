const express = require('express')
const authToken = require('../Middleware/authToken');
const router = express.Router();
const {fetchExpense, addExpense,deleteExpense} = require('../Controller/ExpenseController');
const {expenseValidation} = require('../Middleware/expenseValidation');


router.get('/',authToken,fetchExpense);
router.post('/',authToken,expenseValidation,addExpense);
router.delete('/:expenseID',authToken,deleteExpense);
module.exports = router;

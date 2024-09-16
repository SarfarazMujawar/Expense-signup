const User = require('../Models/User');

const fetchExpense = async(req,res)=>{
    const {_id} = req.user;  // Assuming req.user is populated after authentication middleware

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({expense:user.expenses,user:req.user});  // Send expenses array as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching expenses', error });
    }
}
// add expense 
const addExpense = async (req,res)=>{
    const{_id} = req.user;
    const {expense,amount} = req.body;
    const expenseData = {expense,amount};
    
try{
    const user = await User.findById(_id);
    if(!user)
    {
        return res.status(404).json({ message: 'User not found' });
    }
    user.expenses.push(expenseData);
   await user.save();
   res.status(200).json({ message: "Expense added successfully" , expensedetails : expenseData, success:true});
}
catch(error)
{
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the expense", error });
}
}

//delete expense
const deleteExpense = async(req,res)=>{
    const {_id} = req.user;
    const {expenseID} = req.params;
    try{
        //finding user by id
        const user = await User.findById(_id);
        //finding index of expense

        const index = user.expenses.findIndex(element=>element._id==expenseID);
   if (index === -1) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        //removing perticular expense from expenses array
        user.expenses.splice(index,1);

        //saving user
        await user.save();

        res.status(200).json({ message: "Expense deleted successfully",success:true });
        
    }
    catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the expense", error });
    }
}

module.exports = {fetchExpense,addExpense,deleteExpense};
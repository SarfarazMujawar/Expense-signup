const User = require('../Models/User');

const fetchExpense = async(req,res)=>{
    // console.log(req.body)
    const {_id} = req.user;
    console.log(_id);
    const user = await User.findById(_id);
    res.send(user.expense)
}

module.exports = {fetchExpense};
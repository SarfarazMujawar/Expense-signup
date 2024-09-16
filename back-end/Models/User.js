const { required, date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    text:{
        required:true,
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    createdAt :{
        type:Date,
        required:true,
        default:Date.now
    }


})

 const UserSchema = new Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true
    },
    expenses:[ExpenseSchema]
 });

const User = mongoose.model('User',UserSchema);

 module.exports = User;
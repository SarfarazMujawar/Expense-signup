const express= require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRouter = require('./Routes/authRouter');
const expenseRouter = require('./Routes/expenseRouter');
const connectToDb = require('./Models/dbConnection')
connectToDb();

app.use(cookieParser())//To parse cookies from incoming requests
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json());

app.use('/auth',authRouter)
app.use('/expense',expenseRouter)
const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
})
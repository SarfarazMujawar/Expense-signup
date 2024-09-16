const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {

    try {

        //we will get name,email,password
        const { name, email, password } = req.body;

        //for security we are hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User for this email already registered, you can login", success: false })
        }
        const newUser = new User({ name, email, password: hashedPassword })
        await newUser.save(); // Save the new user to the database

        return res.status(201).json({
            message: "User registered successfully",
            success: true,


        });



    }
    catch (err) {
        console.error("Error during signup:", err); // Log the error
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }

}
const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const logUser = await User.findOne({ email });

        if (!logUser) {
            return res.status(403).json({ message: "Login failed email or password is wrong", success: false })
        }
        const isPassEqual = await bcrypt.compare(password, logUser.password)
        if (!isPassEqual) {
            return res.status(403).json({ message: "Login failed password is wrong", success: false })
        }

        //generating jwt token we pass payload, secret key and expiry date
        const token = jwt.sign(
            { email: logUser.email, _id: logUser._id, name: logUser.name },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        )
        // sending token in cookies the cookie will be stored in browser for only one hour 
        //after that user need login again
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, secure: true });
        res.status(201).json({
            message: "Login Successful", success: true, token, email,
            name: logUser.name
        });
    }
    catch (error) {


        res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

const logout = (req, res) => {
    // Clear the cookie (or handle session termination)
    res.clearCookie('token'); // Assuming 'token' is the cookie name
    res.status(200).json({ message: 'Logout successful' });
}

const verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "message: 'Authentication failed. No token provided.'" })
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid Token" });

    }
    res.status(200).json({ valid: true })
}
module.exports = { signup, login, logout, verifyToken }
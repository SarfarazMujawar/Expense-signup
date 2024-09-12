const jwt = require('jsonwebtoken');
const authToken = (req,res,next)=>{
    console.log(req);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied.' });
      }

      try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user=decoded;
        next();

      }
      catch (error) {
        return res.status(401).json({ message: 'Token is not valid.' });
      }
    
}
module.exports = authToken;
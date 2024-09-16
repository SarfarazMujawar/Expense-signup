const Joi = require('joi');
const expenseValidation = (req,res,next)=>{
    const schema = Joi.object({
        text:Joi.string().required().min(2).required(),
        amount:Joi.number().precision(2).required(),
        createdAt:Joi.date().default(()=>new Date()).optional()
    })

    const {error} = schema.validate(req.body);
    if(error)
    {
        return res.status(400).json({message:"Bad Request",error: error.details[0].message});
    }
    next();
}
module.exports ={expenseValidation};
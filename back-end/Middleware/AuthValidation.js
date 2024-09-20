const Joi = require('joi');

const loginValidation = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error: error.details[0].message });
    }
    next();
}
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error: error.details[0].message });
    }
    next();
    
}

module.exports = { loginValidation, signupValidation };
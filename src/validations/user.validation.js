import Joi from 'joi';

export const validateRegisterUser = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        age: Joi.number().required(),
        password: Joi.string().min(6).required(),
        city: Joi.string().required(),
        zipCode: Joi.string().length(6).required()  
    });
    return schema.validate(data);
}
export const validateLoginUser = (data) => {
    const schema = Joi.object({ 
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}   
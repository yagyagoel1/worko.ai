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
export const validategetAllUsers = (data) => {
    const schema = Joi.object({
        page: Joi.number().required()
    });
    return schema.validate(data);
}
export const validategetUser = (data) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    return schema.validate(data);
}

export const validateUpdateUser = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        age: Joi.number().required(),
        city: Joi.string().required(),
        zipCode: Joi.string().length(6).required()
    });
    return schema.validate(data);
}
export const validateUpdateUserFields = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        age: Joi.number(),
        city: Joi.string(),
        zipCode: Joi.string().length(6)
    });
    return schema.validate(data);
};
export const validateUpdatePassword = (data) => {
    const schema = Joi.object({

        newPassword: Joi.string().min(6).required()
    });
    return schema.validate(data);
}
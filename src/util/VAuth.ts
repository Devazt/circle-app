import * as Joi from "joi"

export const registerSchema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    fullname: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
    profile_picture: Joi.string().required(),
    profile_detail: Joi.string().required()
})
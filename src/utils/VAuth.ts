import Joi from "joi"

export const CrUserRegSchema = Joi.object({
    username: Joi.string().min(4).required(),
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})

export const CrUserLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})
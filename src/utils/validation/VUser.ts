import Joi from "joi"

export const CrUserSchema = Joi.object({
    username: Joi.string().min(4).required(),
    fullname: Joi.string().min(5),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    photo_profile: Joi.string(),
    bio: Joi.string()
})

export const UpUserSchema = Joi.object({
    username: Joi.string().min(4),
    fullname: Joi.string().min(5),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    photo_profile: Joi.string(),
    bio: Joi.string()
})
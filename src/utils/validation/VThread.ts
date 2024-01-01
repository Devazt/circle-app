import Joi from "joi"

export const CrThreadSchema = Joi.object({
    content: Joi.string().allow().optional(),
    image: Joi.string().allow().optional(),
    user: Joi.number()
}).or("content", "image").required()

export const UpThreadSchema = Joi.object({
    content: Joi.string().allow().optional(),
    image: Joi.string().allow().optional()
}).or("content", "image").required()
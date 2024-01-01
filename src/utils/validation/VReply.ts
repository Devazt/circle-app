import Joi from "joi";

export const CrRepSchema = Joi.object({
    content: Joi.string().allow().optional(),
    image: Joi.string().allow().optional(),
    thread: Joi.number().required(),
    user: Joi.number() 
}).or("content", "image").required()

export const UpRepSchema = Joi.object({
    content: Joi.string().allow().optional(),
    image: Joi.string().allow().optional()
}).or("content", "image").required()
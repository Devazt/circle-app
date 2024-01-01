import Joi from "joi"

export const CrLikeSchema = Joi.object({
    user: Joi.number(),
    thread: Joi.number()
})
import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CrRepSchema, UpRepSchema } from "../utils/validation/VReply";
import dotenv from "dotenv"
dotenv.config();

export default new class SReply {
    private readonly ReplyRepo: Repository<Reply> = AppDataSource.getRepository(Reply)

    async find(req: Request, res: Response): Promise<Response> {
        try{
            const reply = await this.ReplyRepo.find({
                relations: ["user", "thread"],
                order: {
                    created_at: "DESC"
                }
            })

            return res.status(200).json({
                message: "Success",
                data: reply
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while finding replies",
                message: error
            })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
                secure: true,
            });

            let image
            if (res.locals.filename) {
                image = res.locals.filename;

                const cloud = await cloudinary.uploader.upload(
                    "src/uploads/" + image,
                    {
                        folder: `circle/user/${res.locals.loginSession.user.id}-${res.locals.loginSession.user.username}/reply`,
                        tags: "circle,user,reply"
                    }
                )
                image = cloud.secure_url
            }

            const loginSession = res.locals.loginSession

            const data: any = {
                content: req.body.content,
                image: image,
                thread: Number(req.body.thread)
            }

            const { error, value } = CrRepSchema.validate(data)
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }

            const replies = this.ReplyRepo.create({
                content: value.content,
                image: image,
                thread: {
                    id: value.thread
                },
                user: {
                    id: loginSession.user.id
                }
            })

            const result = await this.ReplyRepo.save(replies)
            return res.status(201).json({
                message: "Success",
                data: result
            })
            console.log(result)

        } catch (error) {
            return res.status(500).json({
                error: "Error while creating reply",
                message: error
            })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const thread = await this.ReplyRepo.findOne({
                where: {id: id},
                relations: ["user", "thread", "replies.user"]
            })
            return res.status(200).json({
                message: "Success",
                data: thread
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while finding reply",
                message: error
            })
        }
    }

    async update( req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const replies = await this.ReplyRepo.findOne({
                where: {id: id}
            })

            if(!replies)
                return res.status(404).json({
                error: "Reply not found"
            })
            
            const data = req.body;
            const { error, value } = UpRepSchema.validate(data)
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }

            if(value.content != "") replies.content = value.content;
            if(value.image != "") replies.image = value.image;

            const update = await this.ReplyRepo.save(replies)
            return res.status(200).json({
                message: "Success",
                data: update
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while updating reply",
                message: error
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const reply = await this.ReplyRepo.findOne({
                where: {id: id}
            })

            if(!reply)
                return res.status(404).json({
                error: "Reply not found"
            })

            const response = await this.ReplyRepo.delete({
                id: id
            });
            return res.status(200).json({
                message: "Success",
                data: response
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while deleting reply",
                message: error
            })
        }
    }
}
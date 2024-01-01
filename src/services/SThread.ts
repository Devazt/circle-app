import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrThreadSchema, UpThreadSchema } from "../utils/validation/VThread";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"

dotenv.config();

export default new class SThread {
    private readonly ThreadRepo: Repository<Thread> = AppDataSource.getRepository(Thread)

    async find( req: Request, res: Response): Promise<Response> {
        try{
            const threads = await this.ThreadRepo.find({
                relations: ["user", "likes.user", "replies"],
                select: {
                    user: {
                        id: true,
                        username: true,
                        fullname: true,
                        photo_profile: true
                    },
                    likes: {
                        id: true,
                        created_at: true,
                        updated_at: true,
                        user: {
                            id: true,
                            username: true,
                            fullname: true,
                            photo_profile: true
                        }
                    }
                },
                order: {
                    id: "DESC"
                }
            })

            return res.status(200).json(
                threads.map((thread) => ({
                    ...thread,
                    likeCount: thread.likes.length,
                    replyCount: thread.replies.length
                }))
            )
        } catch (error) {
            return res.status(500).json({
                error: "Error while finding threads",
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
            })

            let image;
            if (res.locals.filename) {
                image = res.locals.filename;

                const cloud = await cloudinary.uploader.upload(
                    "src/uploads/" + image,
                    {
                        folder: `circle/user/${res.locals.loginSession.user.id}-${res.locals.loginSession.user.username}/thread`,
                        tags: "circle,user,thread"
                    }
                );
                image = cloud.secure_url;
            }

            const data = {
                content: req.body.content,
                image: image,
            };

            const loginSession = res.locals.loginSession;

            const { error, value } = CrThreadSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const thread = this.ThreadRepo.create({
                ...value,
                user: {
                    id: loginSession.user.id
                }
            });
            
            const createThread = await this.ThreadRepo.save(thread);
            return res.status(201).json({
                message: "Success",
                data: createThread
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const thread = await this.ThreadRepo.createQueryBuilder("thread")
            .leftJoinAndSelect("thread.user", "user")
            .leftJoinAndSelect("thread.replies", "replies")
            .leftJoinAndSelect("replies.user", "replyUser")
            .where("thread.id = :id", { id })
            .orderBy("replies.id", "ASC")
            .getOne();

            return res.status(200).json(thread);
        } catch (error) {
            return res.status(500).json({
                error: "Error while finding thread",
                message: error
            })
        }
    }

    async update( req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const thread = await this.ThreadRepo.findOne({
                where: {id: id}
            })

            if(!thread)
            return res.status(404).json({
                message: `Thread ${id} not found`
            })

            const data = req.body
            const { error, value } = UpThreadSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message })
            }
            if (value.content != "") thread.content = value.content;
            if (value.image != "") thread.image = value.image;

            const update = await this.ThreadRepo.save(thread)
            return res.status(200).json({
                message: "Thread updated successfully",
                data: update
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while updating thread",
                message: error
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const thread = await this.ThreadRepo.findOne({
                where: {id: id}
            })

            if (!thread)
            return res.status(404).json({
                message: `Thread ${id} not found`
            })

            const response = await this.ThreadRepo.delete({
                id: id
            });
            return res.status(200).json({
                message: "Thread deleted successfully",
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while deleting thread",
                message: error
            })
        }
    }
}
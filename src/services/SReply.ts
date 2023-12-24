import { Repository } from "typeorm";
import { Reply } from "../entities/Reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import cloudinary from "../middlewares/cloudinary/cloudinary";
import { promisify } from "util";
import fs from "fs"

const unlinkAsync = promisify(fs.unlink);

export default new class SReply {
    private readonly ReplyRepo: Repository<Reply> = AppDataSource.getRepository(Reply)

    async find(req: Request, res: Response): Promise<Response> {
        try{
            const replies = await this.ReplyRepo.find({where: {thread: {id: Number(req.params.id)}}, relations: ["user", "thread"], order: {created_at: "DESC"}});
            return res.status(200).json({
                message: "Success",
                data: replies
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try{
            const data = req.body;
            const userId = res.locals.loginSession.user.id;
            const username = res.locals.loginSession.user.username;

            if (req.file){
                const cloud = await cloudinary.uploader.upload(req.file.path, {
                    folder: `circle/user/${userId}-${username}/reply`,
                    tags: "circle,user,reply"
                });
                data.image = cloud.secure_url;
                await unlinkAsync(req.file.path);
            }

            const result = this.ReplyRepo.create({
                content: data.content,
                image: data.image,
                user: userId
            })

            const reply = await this.ReplyRepo.save(result);            
            return res.status(201).json({
                message: "Success",
                data: reply
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message})
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const id = req.params.id
            const userId = res.locals.loginSession.user.id;

            const checkData = await this.ReplyRepo.findOneBy({id: Number(id)});
            if (!checkData)
                return res.status(404).json({
                    message: "Reply not found"
                })

            const checkUser = await this.ReplyRepo.findOne({where: {id: Number(id)}, relations: ["user"]});
            if (checkUser.user.id !== userId)
                return res.status(404).json({
                    message: "User not allowed to delete this reply"
                })

            const result = await this.ReplyRepo.delete({id: Number(id)});
            return res.status(200).json({
                message: "Success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    }
}   
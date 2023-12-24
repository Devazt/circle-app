import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import cloudinary from "../middlewares/cloudinary/cloudinary";
import { promisify } from "util";
import fs from "fs"

const unlinkAsync = promisify(fs.unlink);

export default new class SThread {
    private readonly ThreadRepo: Repository<Thread> = AppDataSource.getRepository(Thread)

    async find(req: Request, res: Response): Promise<Response> {
        try{
            const threads = await this.ThreadRepo.find({relations: ["user"], order: {id: "DESC"}});
            return res.status(200).json({
                message: "Success",
                data: threads
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id
            const thread = await this.ThreadRepo.findOne({where: {id: Number(id)}, relations: ["user"]});
            return res.status(200).json({
                message: "Success",
                data: thread
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
                    folder: `circle/user/${userId}-${username}/thread`,
                    tags: "circle,user,thread"
                });
                data.image = cloud.secure_url;
                await unlinkAsync(req.file.path);
            }

            const result = this.ThreadRepo.create({
                content: data.content,
                image: data.image,
                user: userId
            })

            const thread = await this.ThreadRepo.save(result);
            return res.status(201).json({
                message: "Success",
                data: thread
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id
            const data = req.body
            const userId = res.locals.loginSession.user.id;
            const username = res.locals.loginSession.user.username;

            const checkData = await this.ThreadRepo.findOneBy({id: Number(id)});
            if (!checkData)
                return res.status(404).json({
                    message: "Thread not found"
                })

            const checkUser = await this.ThreadRepo.findOne({where: {id: Number(id)}, relations: ["user"]});
            if (checkUser.user.id !== userId)
                return res.status(404).json({
                    message: "User not allowed to update this thread"
                })
            
            if (req.file){
                const urlArray = checkData.image.split('/');
                console.log(urlArray)
                const imageName = urlArray[urlArray.length - 1];
                console.log(imageName)
                const publicId = imageName.split('.')[0];
                console.log(publicId)
                await cloudinary.uploader.destroy(`circle/user/${userId}-${username}/thread` + publicId);

                const cloud = await cloudinary.uploader.upload(req.file.path, {
                    folder: `circle/user/${userId}-${username}/thread`,
                    tags: "circle,user,thread"
                });
                data.image = cloud.secure_url;
                await unlinkAsync(req.file.path);
            }

            await this.ThreadRepo.update({id: Number(id)}, {
                ...data,
                image: data.image
            });

            const viewresult = await this.ThreadRepo.findOneBy({id: Number(id)});
            return res.status(200).json({
                message: "Success",
                data: viewresult
            })

        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id
            const userId = res.locals.loginSession.user.id;

            const checkData = await this.ThreadRepo.findOneBy({id: Number(id)});
            if (!checkData)
                return res.status(404).json({
                    message: "Thread not found"
                })

            const checkUser = await this.ThreadRepo.findOne({where: {id: Number(id)}, relations: ["user"]});
            if (checkUser.user.id !== userId)
                return res.status(404).json({
                    message: "User not allowed to delete this thread"
                })

            const result = await this.ThreadRepo.delete({id: Number(id)});
            return res.status(200).json({
                message: "Success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
}
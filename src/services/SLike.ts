import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CrLikeSchema } from "../utils/validation/VLike";
import { Like } from "../entities/Like";

export default new class SLike {
    private readonly LikeRepo: Repository<Like> = AppDataSource.getRepository(Like)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const like = await this.LikeRepo.find({
                relations: ["user", "reply"]
            })

            return res.status(200).json({
                message: "Success",
                data: like
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while finding like",
                message: error
            })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            
            const { error, value } = CrLikeSchema.validate(data)
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
            
            const loginSession = res.locals.loginSession
            const likeSelected: Like | null = await this.LikeRepo.findOne({
                where: {
                    user: {
                        id: loginSession.user.id
                    },
                    thread: {
                        id: value.thread
                    }
                }
            })

            if(likeSelected) {
                await this.LikeRepo.remove(likeSelected);
                return res.status(200).json({
                    message: "Like removed successfully"
                })
            }

            const like = this.LikeRepo.create({
                thread: value.thread,
                user: {
                    id: loginSession.user.id
                }
            })

            const result  = await this.LikeRepo.save(like);
            return res.status(200).json({
                message: "Like created successfully",
                data: result
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while creating like",
                message: error
            })
        }
    }

    async delete( req: Request, res: Response ): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const like = await this.LikeRepo.findOne({
                where: { id: id }
            })

            if(!like) return res.status(404).json({
                error: "Like not found"
            })

            const response = await this.LikeRepo.delete({id: id})
            return res.status(200).json({
                message: "Success",
                data: response
            })

        } catch (error) {
            return res.status(500).json({
                error: "Error while deleting like",
                message: error
            })
        }
    }

    async findOne( req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const like = await this.LikeRepo.findOne({
                where: {id: id},
                relations: ["user", "thread"]
            })
            return res.status(200).json({
                message: "Success",
                data: like
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error while finding like",
                message: error
            })
        }
    }
}
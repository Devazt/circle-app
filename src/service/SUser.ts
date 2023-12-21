import { Repository } from "typeorm";
import { User } from "../entities/EUser";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new class SUser {
    private readonly RepoUser: Repository<User> = AppDataSource.getRepository(User);

    async find(req: Request, res: Response): Promise<Response> {
        try{
            const users = await this.RepoUser.find()
            return res.status(200).json({message: "success", data: users})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try{
            const user = await this.RepoUser.findOneBy({id: Number(req.params.id)})
            return res.status(200).json({message: "success", data: user})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const 
        }
    }
}
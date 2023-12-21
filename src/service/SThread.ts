import { Repository } from "typeorm";
import { Thread } from "../entities/EThread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new class SThread {
    private readonly RepoThread: Repository<Thread> = AppDataSource.getRepository(Thread);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const threads = await this.RepoThread.find({relations: ["user"], order: {id: "DESC"}});
            return res.status(200).json({message: "success", data: threads});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const thread = await this.RepoThread.findBy({id: Number(req.params.id)});
            return res.status(200).json({message: "success", data: thread});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const thread = await this.RepoThread.create(req.body);
            await this.RepoThread.save(thread);
            return res.status(200).json({message: "success", data: thread});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
import { Request, Response } from "express";
import SThread from "../service/SThread";

export default new class CThread {
    find(req: Request, res: Response) {
        SThread.find(req, res);
    }

    findOne(req: Request, res: Response) {
        SThread.findOne(req, res);
    }

    create(req: Request, res: Response) {
        SThread.create(req, res);
    }
}
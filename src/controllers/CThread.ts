import { Request, Response } from "express";
import SThread from "../services/SThread";

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

    delete(req: Request, res: Response) {
        SThread.delete(req, res);
    }

    update(req: Request, res: Response) {
        SThread.update(req, res);
    }
}
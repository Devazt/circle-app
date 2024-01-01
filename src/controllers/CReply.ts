import { Request, Response } from "express";
import SReply from "../services/SReply";

export default new class CReply {
    find(req: Request, res: Response) {
        SReply.find(req, res);
    }

    create(req: Request, res: Response) {
        SReply.create(req, res);
    }

    update(req: Request, res: Response) {
        SReply.update(req, res);
    }

    findOne(req: Request, res: Response) {
        SReply.findOne(req, res);
    }

    delete(req: Request, res: Response) {
        SReply.delete(req, res);
    }
}
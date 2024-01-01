import { Request, Response } from "express";
import SLike from "../services/SLike";

export default new class CLike {
    find(req: Request, res: Response) {
        SLike.find(req, res);
    }

    findOne(req: Request, res: Response) {
        SLike.findOne(req, res);
    }

    create(req: Request, res: Response) {
        SLike.create(req, res);
    }

    delete(req: Request, res: Response) {
        SLike.delete(req, res);
    }

}
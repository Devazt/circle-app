import { Request, Response } from "express";
import SUser from "../service/SUser";

export default new class CUser {
    find(req: Request, res: Response) {
        SUser.find(req, res);
    }

    findOne(req: Request, res: Response) {
        SUser.findOne(req, res);
    }
}
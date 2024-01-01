import { Request, Response } from "express";
import SUser from "../services/SUser";

export default new class CUser {
    find(req: Request, res: Response) {
        SUser.find(req, res)
    }

    findOne(req: Request, res: Response) {
        SUser.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SUser.create(req, res)
    }

    updatePW(req: Request, res: Response) {
        SUser.updateByJWT(req, res)
    }

    update(req: Request, res: Response) {
        SUser.update(req, res)
    }

    delete(req: Request, res: Response) {
        SUser.delete(req, res)
    }
    
    follow(req: Request, res: Response) {
        SUser.follow(req, res)
    }
}
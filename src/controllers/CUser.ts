import { Request, Response } from "express";
import SUser from "../services/SUser";

export default new class CUser {
    register( req: Request, res: Response) {
        SUser.register(req, res)
    }

    login( req: Request, res: Response) {
        SUser.login(req, res)
    }

    check( req: Request, res: Response) {
        SUser.check(req, res)
    }

    find( req: Request, res: Response) {
        SUser.find(req, res)
    }

    findOne( req: Request, res: Response) {
        SUser.findOne(req, res)
    }
}
import { Request, Response } from "express";
import SAuth from "../services/SAuth";

export default new class Cauth {
    register(req: Request, res: Response) {
        SAuth.register(req, res);
    }

    login(req: Request, res: Response) {
        SAuth.login(req, res);
    }

    check(req: Request, res: Response) {
        SAuth.check(req, res);
    }
}
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv";

dotenv.config();

export default new class AuthTokenMiddleware {
    Authentication(req: Request, res: Response, next: NextFunction) : Response {
        try {
            const authorization = req.headers.authorization;

            if(!authorization || !authorization.startsWith("Bearer")) {
                return res.status(401).json({
                    status: "fail",
                    message: "Unauthorized"
                })
            }

            const token = authorization.split(" ")[1];

            try {
                const loginSession = jwt.verify(token, process.env.JWT_SECRET);
                res.locals.loginSession = loginSession
                next();
            } catch (error) {
                return res.status(401).json({
                    status: "fail",
                    message: "Token Verification Fail"
                })
            }
        } catch (error) {
            return res.status(401).json({
                status: "fail",
                message: error.message
            })
        }
    }
}
import express from "express"
import CAuth from "../controllers/CAuth"
import AuthTokenMiddleware from "../middlewares/jwt/jwt"

const RAuth = express.Router()

RAuth.post("/auth/register", CAuth.register);
RAuth.post("/auth/login", CAuth.login);
RAuth.get("/auth/check", AuthTokenMiddleware.Authentication, CAuth.check);

export default RAuth
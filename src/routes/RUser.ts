import express from "express"
import CUser from "../controllers/CUser"
import AuthTokenMiddleware from "../middlewares/jwt/jwt"

const RUser = express.Router()

RUser.post("/auth/register", CUser.register)
RUser.post("/auth/login", CUser.login)
RUser.get("/auth/check", AuthTokenMiddleware.Authentication, CUser.check)
RUser.get("/user", CUser.find)
RUser.get("/user/:id", CUser.findOne)

export default RUser

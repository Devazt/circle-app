import express from "express"
import CReply from "../controllers/CReply"
import AuthTokenMiddleware from "../middlewares/jwt/jwt"
import upload from "../middlewares/multer/multer"

const RReply = express.Router()

RReply.get("/reply/:id", CReply.find)
RReply.post("/reply", AuthTokenMiddleware.Authentication, upload.single("image"), CReply.create)
RReply.delete("/reply/:id", AuthTokenMiddleware.Authentication, CReply.delete)

export default RReply
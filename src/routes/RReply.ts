import express from "express"
import CReply from "../controllers/CReply"
import AuthTokenMiddleware from "../middlewares/jwt/jwt"
import upload from "../middlewares/multer/multer"

const RReply = express.Router()

RReply.get("/replies", CReply.find);
RReply.get("/reply/:id", CReply.findOne);
RReply.post("/replies", AuthTokenMiddleware.Authentication, upload.Upload("image"), CReply.create);
RReply.patch("/reply/:id", CReply.update);
RReply.delete("/reply/:id", CReply.delete);

export default RReply
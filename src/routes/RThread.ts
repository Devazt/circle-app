import express from 'express'
import CThread from '../controllers/CThread'
import AuthTokenMiddleware from '../middlewares/jwt/jwt'
import upload from '../middlewares/multer/multer'

const RThread = express.Router()

RThread.get("/thread", CThread.find)
RThread.get("/thread/:id", CThread.findOne)
RThread.post("/thread", AuthTokenMiddleware.Authentication, upload.single("image"), CThread.create)
RThread.patch("/thread/:id", AuthTokenMiddleware.Authentication, upload.single("image"), CThread.update)
RThread.delete("/thread/:id", AuthTokenMiddleware.Authentication, CThread.delete)

export default RThread
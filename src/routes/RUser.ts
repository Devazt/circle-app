import express from "express"
import CUser from "../controllers/CUser"
import AuthTokenMiddleware from "../middlewares/jwt/jwt"

const RUser = express.Router()

RUser.get("/users", CUser.find);
RUser.get("/user", AuthTokenMiddleware.Authentication, CUser.findOne);
RUser.post("/users", CUser.create);
RUser.patch("/user/:id", CUser.update);
RUser.patch("/userpw", AuthTokenMiddleware.Authentication, CUser.updatePW);
RUser.delete("/user/:id", CUser.delete);
RUser.post("/follow", AuthTokenMiddleware.Authentication, CUser.follow);

export default RUser

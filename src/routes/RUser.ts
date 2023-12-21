import * as express from "express";
import CUser from "../controller/CUser";

const RUser = express.Router();

RUser.get("/user", CUser.find);
RUser.get("/user/:id", CUser.findOne);

export default RUser;
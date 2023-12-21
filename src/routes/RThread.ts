import * as express from "express";
import CThread from "../controller/CThread";

const RThread = express.Router();

RThread.get("/thread", CThread.find);
RThread.get("/thread/:id", CThread.findOne);
RThread.post("/thread", CThread.create);

export default RThread;
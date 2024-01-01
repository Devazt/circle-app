import express from 'express';
import CLike from '../controllers/CLike';
import AuthTokenMiddleware from '../middlewares/jwt/jwt';
import upload from '../middlewares/multer/multer';

const RLike = express.Router();

RLike.get("/likes", CLike.find);
RLike.get("/like/:id", AuthTokenMiddleware.Authentication, CLike.findOne);
RLike.post("/likes", AuthTokenMiddleware.Authentication, CLike.create);
RLike.delete("/like/:id", CLike.delete);


export default RLike
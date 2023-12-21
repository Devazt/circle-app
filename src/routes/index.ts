import * as express from "express";
import RThread from "./RThread";
import RUser from "./RUser";

const router = express.Router();

router.use(RThread)
router.use(RUser)

export default router
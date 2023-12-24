import express from "express"
import RUser from "../routes/RUser"
import RThread from "./RThread"
import RReply from "./RReply"

const router = express.Router()

router.use(RUser)
router.use(RThread)
router.use(RReply)

export default router

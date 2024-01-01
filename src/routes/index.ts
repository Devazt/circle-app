import express from "express"
import RUser from "../routes/RUser"
import RThread from "./RThread"
import RReply from "./RReply"
import RAuth from "./RAuth"
import RLike from "./RLike"

const router = express.Router()

router.use(RUser)
router.use(RThread)
router.use(RReply)
router.use(RAuth)
router.use(RLike)

export default router

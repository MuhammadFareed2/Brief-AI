import userRoutes from "../modules/user/routes.js"
import briefRoutes from "../modules/brief/routes.js"
import { Router } from "express"

const router = Router()

router.use("/users", userRoutes)
router.use("/briefs", briefRoutes)

export default router
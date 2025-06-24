import userRoutes from "../modules/user/routes.js"
import { Router } from "express"

const router = Router()

router.use("/users", userRoutes)

export default router
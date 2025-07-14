import { Router } from "express";
import generateBriefController from "./controllers/generate.js";
import getHistoryController from "./controllers/getHistory.js"; // ✅ import

import authMiddleware from "../../helpers/authMiddleware.js";

const router = Router();

router.post("/generate", authMiddleware, generateBriefController);
router.get("/history", authMiddleware, getHistoryController); // ✅ new route

export default router;

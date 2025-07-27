import { Router } from "express";
import generateBriefController from "./controllers/generate.js";
import getHistoryController from "./controllers/getHistory.js";
import getBriefByIdController from "./controllers/getBriefById.js";
import authMiddleware from "../../helpers/authMiddleware.js";
import getBriefStatsController from "./controllers/stats.js";


const router = Router();

router.post("/generate", authMiddleware, generateBriefController);
router.get("/history", authMiddleware, getHistoryController);
router.get("/stats", authMiddleware, getBriefStatsController);
router.get("/:id", authMiddleware, getBriefByIdController);

export default router;

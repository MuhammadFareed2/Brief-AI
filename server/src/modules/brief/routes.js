import { Router } from "express";
import generateBriefController from "./controllers/generate.js";
import authMiddleware from "../../helpers/authMiddleware.js";

const router = Router();

router.post("/generate", authMiddleware, generateBriefController);

export default router;

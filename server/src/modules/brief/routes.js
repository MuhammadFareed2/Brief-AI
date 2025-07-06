import { Router } from "express";
import generateBriefController from "./controllers/generate.js";

const router = Router();

router.post("/generate", generateBriefController);

export default router;

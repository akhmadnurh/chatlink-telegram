import { Router } from "express";
import { CProcessMessage } from "../controllers/telegram";

const router = Router();

router.post("/webhook", CProcessMessage);

export default router;

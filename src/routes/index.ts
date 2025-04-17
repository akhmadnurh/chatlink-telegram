import { Router } from "express";
import telegramRoute from "./telegram.route";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, Welcome to Chatlink Telegram Bot API!");
});

router.use("/telegram", telegramRoute);

export default router;

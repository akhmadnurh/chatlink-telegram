import express from "express";
import { env } from "./configs/env";
import router from "./routes";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Chatlink Telegram Bot!");
});

app.use(express.json());

app.use(env.APP.BASEPATH, router);

app.listen(env.APP.PORT, () => {
  console.log(`Server is running on http://localhost:${env.APP.PORT}`);
});

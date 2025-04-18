import axios from "axios";
import { handleError } from "./error.util";
import { env } from "../configs/env";

const TELEGRAM_BOT_TOKEN = env.TELEGRAM.TOKEN;
const TELEGRAM_API_URL = `${env.TELEGRAM.URL}/bot${TELEGRAM_BOT_TOKEN}`;

export const sendMessage = async (chat_id: number | string, text: string) => {
  try {
    await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id,
      text,
      parse_mode: "HTML",
    });
  } catch (error) {
    throw handleError(error);
  }
};

import "dotenv/config";

export const env = {
  APP: {
    PORT: process.env.APP_PORT ?? 3000,
    BASEPATH: process.env.APP_BASEPATH ?? "/",
  },
  GEMINI: {
    API_KEY: process.env.GEMINI_API_KEY ?? "",
    MODEL: process.env.GEMINI_MODEL ?? "",
  },
  TELEGRAM: {
    TOKEN: process.env.TELEGRAM_TOKEN ?? "",
  },
};

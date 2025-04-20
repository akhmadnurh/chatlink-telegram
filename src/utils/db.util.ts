import { join } from "path";
import { IUserSummaryDb } from "../interfaces/global/db.interface";
import { Low, JSONFile } from "lowdb";
import { handleError } from "./error.util";

const defaultData: IUserSummaryDb = {
  summary: null,
};
export const getUserDb = async (chatId: number): Promise<IUserSummaryDb> => {
  const dbPath = join(__dirname, "..", "..", "db", `${chatId}.json`);

  try {
    const adapter = new JSONFile<IUserSummaryDb>(dbPath);
    const db = new Low(adapter);

    await db.read();

    if (!db.data) {
      db.data = defaultData;
      await db.write();
    }

    return db.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const setUserDb = async (chatId: number, summary: string) => {
  const dbPath = join(__dirname, "..", "..", "db", `${chatId}.json`);

  try {
    const adapter = new JSONFile<IUserSummaryDb>(dbPath);
    const db = new Low(adapter);

    await db.read();

    db.data = { summary };

    await db.write();

    return db.data;
  } catch (error) {
    throw handleError(error);
  }
};

import { join } from "path";
import { IUserSummaryDb } from "../interfaces/global/db.interface";
import { JSONFilePreset } from "lowdb/node";
import { handleError } from "./error.util";

const defaultData: IUserSummaryDb = {
  summary: null,
};
export const getUserDb = async (chatId: number): Promise<IUserSummaryDb> => {
  const dbPath = join("db", `${chatId}.json`);

  try {
    const db = await JSONFilePreset<IUserSummaryDb>(dbPath, defaultData);

    return db.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const setUserDb = async (chatId: number, summary: string) => {
  const dbPath = join("db", `${chatId}.json`);

  try {
    const db = await JSONFilePreset<IUserSummaryDb>(dbPath, defaultData);

    db.data.summary = summary;

    await db.write();

    return db.data;
  } catch (error) {
    throw handleError(error);
  }
};

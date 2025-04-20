import { join } from "path";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { IUserSummaryDb } from "../interfaces/global/db.interface";
import { handleError } from "./error.util";

const defaultData: IUserSummaryDb = {
  summary: null,
};

const getDb = async (): Promise<Database> => {
  const dbPath = join(__dirname, "..", "..", "db", "users.sqlite");
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_summaries (
      chatId INTEGER PRIMARY KEY,
      summary TEXT
    )
  `);

  return db;
};

export const getUserDb = async (chatId: number): Promise<IUserSummaryDb> => {
  try {
    const db = await getDb();

    const row = await db.get<{ summary: string | null }>(
      "SELECT summary FROM user_summaries WHERE chatId = ?",
      chatId
    );

    return row ? { summary: row.summary } : defaultData;
  } catch (error) {
    throw handleError(error);
  }
};

export const setUserDb = async (
  chatId: number,
  summary: string
): Promise<IUserSummaryDb> => {
  try {
    const db = await getDb();

    await db.run(
      "INSERT OR REPLACE INTO user_summaries (chatId, summary) VALUES (?, ?)",
      chatId,
      summary
    );

    return { summary };
  } catch (error) {
    throw handleError(error);
  }
};

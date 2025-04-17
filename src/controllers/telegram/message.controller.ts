import { HttpStatusCode } from "axios";
import { SProcessMessage } from "../../services/telegram";
import { Request, Response } from "express";
import { ITelegramMessageBody } from "../../interfaces/telegram";
import { handleControllerError, handleControllerResponse } from "../../utils";

export const CProcessMessage = async (req: Request, res: Response) => {
  try {
    const body: ITelegramMessageBody = req.body;
    const response: any = await SProcessMessage(body);

    handleControllerResponse(res, response);
  } catch (error) {
    handleControllerError(res, error);
  }
};

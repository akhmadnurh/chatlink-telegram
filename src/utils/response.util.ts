import { IGlobalResponse } from "../interfaces/global";
import { Response } from "express";

export const handleControllerResponse = (
  res: Response,
  data: IGlobalResponse
) => {
  res.status(data.status).json(data);
};

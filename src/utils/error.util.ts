import { HttpStatusCode } from "axios";
import { IGlobalErrorResponse } from "../interfaces/global";
import { Response } from "express";

export const handleError = (error: any, data: any = {}) => {
  console.error(error);

  const response: IGlobalErrorResponse = {
    status: error?.status ?? HttpStatusCode.InternalServerError,
    message: error?.message ?? "Internal Server Error",
    data,
  };

  return response;
};

export const handleControllerError = (res: Response, error: any) => {
  const response: IGlobalErrorResponse = {
    status: error?.status ?? HttpStatusCode.InternalServerError,
    message: error?.message ?? "Internal Server Error",
  };

  res.status(response.status).json(response);
};

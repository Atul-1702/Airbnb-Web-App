import { NextFunction, Request, Response } from "express";
import AppError from "../utils/errors/app.error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function bookingErrorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    success: false,
    message: message,
  });
}

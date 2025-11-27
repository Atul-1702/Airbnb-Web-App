import { NextFunction, Response, Request } from "express";
import AppError from "../utils/errors/app.error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function HotelErrorMiddleware(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  error.statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  error.message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
}

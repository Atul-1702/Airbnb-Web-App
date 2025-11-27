import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function AppErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  error.message = error.message || "something went wrong";

  res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: error.message,
  });
}

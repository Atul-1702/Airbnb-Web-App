import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default function AppErrorMiddleware(
  err: Error,
  req: Request,
  res: Response
) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Some unexpected error occured.",
  });
}

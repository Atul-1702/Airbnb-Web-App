import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import {
  BadRequestError,
  InternalServerError,
} from "../utils/errors/app.error";

export default function zodValidatorSchema(
  zodSchema: ZodType
): (request: Request, response: Response, next: NextFunction) => void {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      zodSchema.parse(request.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((err) => {
            return err.path + " : " + err.message;
          })
          .join(" ,");

        throw new BadRequestError(message || "Invalid request body");
      }
      throw new InternalServerError("Some unknwon error occured.");
    }
  };
}

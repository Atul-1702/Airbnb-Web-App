import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { BadRequestError } from "../utils/errors/app.error";

export default function zodSchemaValidator(
  zodSchema: ZodType
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((err) => {
            return err.path + " property : " + err.message;
          })
          .join(", ");
        throw new BadRequestError(message);
      }
    }
  };
}

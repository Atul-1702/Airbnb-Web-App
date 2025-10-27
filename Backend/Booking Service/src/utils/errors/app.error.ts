import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default interface AppError extends Error {
  statusCode: number;
}

export class NotFoundError implements AppError {
  name = ReasonPhrases.NOT_FOUND;
  statusCode = StatusCodes.NOT_FOUND;
  message = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.NOT_FOUND;
  }
}

export class BadRequestError implements AppError {
  name = ReasonPhrases.BAD_REQUEST;
  statusCode = StatusCodes.BAD_REQUEST;
  message = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.BAD_REQUEST;
  }
}

export class ConflictError implements AppError {
  name = ReasonPhrases.CONFLICT;
  statusCode = StatusCodes.CONFLICT;
  message = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.CONFLICT;
  }
}

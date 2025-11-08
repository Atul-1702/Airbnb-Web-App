import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default interface AppError extends Error {
  statusCode: number;
}

export class ServiceUnavailable implements AppError {
  statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  name: string = ReasonPhrases.SERVICE_UNAVAILABLE;
  message: string = "";

  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.SERVICE_UNAVAILABLE;
  }
}

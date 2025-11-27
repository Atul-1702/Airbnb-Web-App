import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default interface AppError extends Error {
  statusCode: number;
}

export class BadRequestError implements AppError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  name: string = ReasonPhrases.BAD_REQUEST;
  message: string;

  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.BAD_REQUEST;
  }
}

export class InternalServerError implements AppError {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  name: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
  message: string;

  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.INTERNAL_SERVER_ERROR;
  }
}

export class ServiceUnavailableError implements AppError {
  statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  name: string = ReasonPhrases.SERVICE_UNAVAILABLE;
  message: string;

  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.SERVICE_UNAVAILABLE;
  }
}

export class ConflictError implements AppError {
  statusCode: number = StatusCodes.CONFLICT;
  name: string = ReasonPhrases.CONFLICT;
  message: string;

  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.CONFLICT;
  }
}

export class GatewayTimeoutError implements AppError {
  statusCode: number = StatusCodes.GATEWAY_TIMEOUT;
  name: string = ReasonPhrases.GATEWAY_TIMEOUT;
  message: string;

  constructor(msg?: string) {
    this.message = msg || ReasonPhrases.GATEWAY_TIMEOUT;
  }
}

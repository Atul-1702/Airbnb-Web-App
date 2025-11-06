import { Prisma } from "../../prisma/generated/prisma/client";
import AppError, { NotFoundError } from "./app.error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export default function handlePrismaError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error?.meta?.modelName);
    switch (error.code) {
      case "P2002":
        return new DuplicateEntryError();
      case "P2003":
        return new ForeignKeyError();
      case "P2004":
        return new DatabaseConstraintError();
      case "P2025":
        const message = error.meta
          ? error?.meta?.modelName + ": " + error?.meta?.cause
          : "Not Found Error";
        return new NotFoundError(message);
      default:
        return new UnknownRequestError();
    }
  }
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new DatabaseInitializationError();
  }
  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new UnknownRequestError();
  }
  return new UnknownRequestError();
}

class DuplicateEntryError implements AppError {
  statusCode: number = StatusCodes.CONFLICT;
  name: string = ReasonPhrases.CONFLICT;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.CONFLICT;
  }
}

class ForeignKeyError implements AppError {
  statusCode: number = StatusCodes.CONFLICT;
  name: string = ReasonPhrases.CONFLICT;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.CONFLICT;
  }
}

class DatabaseConstraintError implements AppError {
  statusCode: number = StatusCodes.BAD_REQUEST;
  name: string = ReasonPhrases.BAD_REQUEST;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.BAD_REQUEST;
  }
}

class DatabaseInitializationError implements AppError {
  statusCode: number = StatusCodes.SERVICE_UNAVAILABLE;
  name: string = ReasonPhrases.SERVICE_UNAVAILABLE;
  message: string = "";
  constructor(msg?: string) {
    console.log(this.message);
    this.message = msg ?? ReasonPhrases.SERVICE_UNAVAILABLE;
  }
}

class UnknownRequestError implements AppError {
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  name: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
  message: string = "";
  constructor(msg?: string) {
    this.message = msg ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
  }
}

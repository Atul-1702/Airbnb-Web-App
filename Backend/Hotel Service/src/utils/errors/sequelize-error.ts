import {
  BadRequestError,
  ConflictError,
  GatewayTimeoutError,
  InternalServerError,
  ServiceUnavailableError,
} from "./app.error";

export default function handleSequelizeError(error: Error) {
  switch (error.name) {
    case "SequelizeValidationError":
      throw new BadRequestError(error.message);
    case "SequelizeDatabaseError":
      throw new InternalServerError(error.message);
    case "SequelizeConnectionError":
      throw new ServiceUnavailableError(error.message);
    case "SequelizeForeignKeyConstraintError":
      throw new ConflictError(error.message);
    case "SequelizeTimeoutError":
      throw new GatewayTimeoutError(error.message);
    default:
      throw new InternalServerError(error.message);
  }
}

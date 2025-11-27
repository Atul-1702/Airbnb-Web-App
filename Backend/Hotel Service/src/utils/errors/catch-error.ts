import handleSequelizeError from "./sequelize-error";

export default async function catchErrorHelper(fn: Function) {
  try {
    return await fn();
  } catch (error: unknown) {
    handleSequelizeError(error as Error);
  }
}

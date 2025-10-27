import handlePrismaError from "./prisma.error";

export default async function catchErrorHelper(canError: any) {
  try {
    const data = await canError();
    return data;
  } catch (error: unknown) {
    throw handlePrismaError(error);
  }
}

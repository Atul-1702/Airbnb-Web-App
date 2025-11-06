import {
  confirmBookingStatusRepository,
  createBookingRepository,
  createIdempotentKeyRepository,
  finalizeIdempotentKeyRepository,
  getIdempotentKeyWithLockRepository,
} from "../repository/booking.repository";
import { bookingdto } from "../dto/booking.dto";
import catchErrorHelper from "../utils/errors/catch.error";
import { Booking, IdempotencyKey } from "../prisma/generated/prisma/client";
import {
  BadRequestError,
  ConflictError,
  LockedError,
  ServiceUnavailable,
} from "../utils/errors/app.error";
import { idemkeydto } from "../dto/idemkey.dto";
import PrismaClient from "./../prisma/client";
import redLock, { redisServer } from "../config/redis.config";
import { serverConfig } from "../config/env.config";

export async function createBookingService(bookingDto: bookingdto) {
  const resource = `hotel:${bookingDto.hotelId}`;
  let data;
  try {
    await redLock.acquire([resource], serverConfig.LOCK_TTL);
    data = await catchErrorHelper(async () => {
      return PrismaClient.$transaction(async (tx) => {
        const bookingData = await createBookingRepository(tx, bookingDto);
        await createIdempotentKeyRepository(tx, bookingData.id);
        return bookingData;
      });
    });
  } catch (error: unknown) {
    if (!redisServer.status || redisServer.status !== "ready") {
      throw new ServiceUnavailable("Redis server is unavailable");
    } else {
      throw new LockedError("Another booking is currently processing.");
    }
  }

  return data;
}

export async function confirmBookingService(key: idemkeydto): Promise<Booking> {
  return await PrismaClient.$transaction(async (tx) => {
    const idemKeyRecord: IdempotencyKey | null = await catchErrorHelper(
      async () => {
        return await getIdempotentKeyWithLockRepository(tx, key.idemKey);
      }
    );

    if (!idemKeyRecord) {
      throw new BadRequestError("Idempotent key does not exist.");
    }
    if (idemKeyRecord.finalized === true) {
      throw new ConflictError("Idempotent key already finalized.");
    }
    return await catchErrorHelper(async () => {
      await finalizeIdempotentKeyRepository(tx, idemKeyRecord.bookingId);
      return await confirmBookingStatusRepository(tx, idemKeyRecord.bookingId);
    });
  });
}

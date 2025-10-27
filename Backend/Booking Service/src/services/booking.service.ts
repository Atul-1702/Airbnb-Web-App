import {
  confirmBookingStatusRepository,
  createBookingRepository,
  createIdempotentKeyRepository,
  finalizeIdempotentKeyRepository,
  getIdempotentKeyRepository,
} from "../repository/booking.repository";
import { bookingdto } from "../dto/booking.dto";
import catchErrorHelper from "../utils/errors/catch.error";
import { Booking, IdempotencyKey } from "../prisma/generated/prisma/client";
import { BadRequestError, ConflictError } from "../utils/errors/app.error";
import { idemkeydto } from "../dto/idemkey.dto";

export async function createBookingService(bookingDto: bookingdto) {
  const data = await catchErrorHelper(async () => {
    const bookingData = await createBookingRepository(bookingDto);
    await createIdempotentKeyRepository(bookingData.id);
    return bookingData;
  });
  return data;
}

export async function confirmBookingService(key: idemkeydto): Promise<Booking> {
  const idemKeyRecord: IdempotencyKey | null = await catchErrorHelper(
    async () => {
      return await getIdempotentKeyRepository(key.idemKey);
    }
  );

  if (!idemKeyRecord) {
    throw new BadRequestError("Idempotent key does not exist.");
  }
  if (idemKeyRecord.finalized === true) {
    throw new ConflictError("Idempotent key already finalized.");
  }
  return await catchErrorHelper(async () => {
    await finalizeIdempotentKeyRepository(idemKeyRecord.bookingId);
    return await confirmBookingStatusRepository(idemKeyRecord.bookingId);
  });
}

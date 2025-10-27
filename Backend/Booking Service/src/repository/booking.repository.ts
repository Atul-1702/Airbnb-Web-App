import {
  Booking,
  BookingStatus,
  IdempotencyKey,
  Prisma,
} from "../prisma/generated/prisma/client";
import PrismaClient from "../prisma/client";
import generateIdempotencyKey from "../utils/helpers/generateIdempotencyKey";

export async function createBookingRepository(
  booking: Prisma.BookingCreateInput
): Promise<Booking> {
  const newBooking = await PrismaClient.booking.create({
    data: booking,
  });
  return newBooking;
}

export async function createIdempotentKeyRepository(
  bookingId: number
): Promise<IdempotencyKey> {
  const idempotentKey = generateIdempotencyKey();
  const idempotentKeyRecord = await PrismaClient.idempotencyKey.create({
    data: {
      idemKey: idempotentKey,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });
  return idempotentKeyRecord;
}

export async function getIdempotentKeyRepository(
  key: string
): Promise<IdempotencyKey | null> {
  const idempotentKeyRecord: IdempotencyKey | null =
    await PrismaClient.idempotencyKey.findUnique({
      where: {
        idemKey: key,
      },
    });
  return idempotentKeyRecord;
}

export async function confirmBookingStatusRepository(
  id: number
): Promise<Booking> {
  const confirmedBooking = await PrismaClient.booking.update({
    where: {
      id: id,
    },
    data: {
      status: BookingStatus.CONFIRMED,
    },
  });
  return confirmedBooking;
}

export async function finalizeIdempotentKeyRepository(bookingId: number) {
  await PrismaClient.idempotencyKey.update({
    where: {
      bookingId,
    },
    data: {
      finalized: true,
    },
  });
}

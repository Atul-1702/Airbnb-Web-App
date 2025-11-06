import {
  Booking,
  BookingStatus,
  IdempotencyKey,
  Prisma,
} from "../prisma/generated/prisma/client";
import PrismaClient from "../prisma/client";
import generateIdempotencyKey from "../utils/helpers/generateIdempotencyKey";

export async function createBookingRepository(
  tx: Prisma.TransactionClient,
  booking: Prisma.BookingCreateInput
): Promise<Booking> {
  const newBooking = await tx.booking.create({
    data: booking,
  });
  return newBooking;
}

export async function createIdempotentKeyRepository(
  tx: Prisma.TransactionClient,
  bookingId: number
): Promise<IdempotencyKey> {
  const idempotentKey = generateIdempotencyKey();
  const idempotentKeyRecord = await tx.idempotencyKey.create({
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

export async function getIdempotentKeyWithLockRepository(
  tx: Prisma.TransactionClient,
  key: string
) {
  const idempotentKeyRecord: IdempotencyKey[] | null = await tx.$queryRaw(
    Prisma.raw(
      `SELECT * FROM IDEMPOTENCYKEY WHERE IDEMKEY='${key}' FOR UPDATE;`
    )
  );
  return idempotentKeyRecord ? idempotentKeyRecord[0] : null;
}

export async function confirmBookingStatusRepository(
  tx: Prisma.TransactionClient,
  id: number
): Promise<Booking> {
  const confirmedBooking = await tx.booking.update({
    where: {
      id: id,
    },
    data: {
      status: BookingStatus.CONFIRMED,
    },
  });
  return confirmedBooking;
}

export async function finalizeIdempotentKeyRepository(
  tx: Prisma.TransactionClient,
  bookingId: number
) {
  await tx.idempotencyKey.update({
    where: {
      bookingId,
    },
    data: {
      finalized: true,
    },
  });
}

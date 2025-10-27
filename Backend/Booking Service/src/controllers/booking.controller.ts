import { Request, Response } from "express";
import {
  confirmBookingService,
  createBookingService,
} from "../services/booking.service";
import { StatusCodes } from "http-status-codes";

export async function createBookingHandler(req: Request, res: Response) {
  const booking = await createBookingService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: booking,
    message: "Booking created successfully.",
  });
}

export async function confirmBookingHandler(req: Request, res: Response) {
  const confirmedBooking = await confirmBookingService(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking confirmed.",
    data: confirmedBooking,
  });
}

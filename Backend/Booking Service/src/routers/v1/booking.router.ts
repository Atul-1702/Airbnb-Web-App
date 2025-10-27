import express from "express";
import zodSchemaValidator from "../../validators/zod.validator";
import bookingZodSchema from "../../dto/booking.dto";
import {
  confirmBookingHandler,
  createBookingHandler,
} from "../../controllers/booking.controller";
import idemKeyZodSchema from "../../dto/idemkey.dto";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  zodSchemaValidator(bookingZodSchema),
  createBookingHandler
);

bookingRouter.patch(
  "/",
  zodSchemaValidator(idemKeyZodSchema),
  confirmBookingHandler
);

export default bookingRouter;

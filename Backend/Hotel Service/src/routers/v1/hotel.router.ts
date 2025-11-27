import express, { Router } from "express";
import zodValidatorSchema from "../../validators/zod.validator";
import hotelZodSchema from "../../dto/hotel.dto";
import {
  createHotelHandler,
  findAllByDeletedAtNotNullHandler,
  findHotelByIdHandler,
  softDeleteHotelHandler,
  updateHotelHandler,
} from "../../controllers/hotel.controller";

const hotelRouter: Router = express.Router();

hotelRouter.post("/", zodValidatorSchema(hotelZodSchema), createHotelHandler);
hotelRouter.get("/", findAllByDeletedAtNotNullHandler);
hotelRouter.delete("/:id", softDeleteHotelHandler);
hotelRouter.get("/:id", findHotelByIdHandler);
hotelRouter.patch("/:id", updateHotelHandler);

export default hotelRouter;

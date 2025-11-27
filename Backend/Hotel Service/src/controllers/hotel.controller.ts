import { Request, Response } from "express";
import {
  createHotelService,
  findAllByDeletedAtNotNullService,
  findHotelByIdService,
  softDeleteHotelService,
  updateHotelService,
} from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(req: Request, res: Response) {
  const data = await createHotelService(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Hotel added successfully.",
    data,
  });
}

export async function findAllByDeletedAtNotNullHandler(
  req: Request,
  res: Response
) {
  const data = await findAllByDeletedAtNotNullService();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "All hotel details fetched successfully.",
    data,
  });
}

export async function softDeleteHotelHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = await softDeleteHotelService(id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel deleted successfully.",
    data,
  });
}

export async function findHotelByIdHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = await findHotelByIdService(id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel details fetched successfully.",
    data,
  });
}

export async function updateHotelHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const data = await updateHotelService(id, req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Hotel details updated successfully.",
    data,
  });
}

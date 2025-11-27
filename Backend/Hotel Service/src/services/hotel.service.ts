import { WhereOptions } from "sequelize";
import { hoteldto } from "../dto/hotel.dto";
import HotelRepository from "../repository/hotel.repository";
import catchErrorHelper from "../utils/errors/catch-error";

const hotelRepository: HotelRepository = new HotelRepository();

export async function createHotelService(hotelData: hoteldto) {
  return catchErrorHelper(async () => {
    return await hotelRepository.create(hotelData);
  });
}

export async function findAllByDeletedAtNotNullService() {
  return await hotelRepository.findAllHotelsByDeletedAtNotNull();
}

export async function softDeleteHotelService(id: number) {
  return await hotelRepository.softDeleteHotel(id);
}

export async function findHotelByIdService(id: number) {
  return await hotelRepository.findById(id);
}

export async function updateHotelService(id: number, hotelData: any) {
  const options: WhereOptions = {
    id: id,
  };

  return await hotelRepository.update(options, hotelData);
}

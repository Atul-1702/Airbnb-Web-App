import BaseRepository from "./base.repository";
import Hotels from "./../sequelize/models/hotels.model";

class HotelRepository extends BaseRepository<Hotels> {
  constructor() {
    super(Hotels);
  }

  async findAllHotelsByDeletedAtNotNull() {
    const allHotels = await Hotels.findAll({
      where: {
        deleted_at: null,
      },
    });

    return allHotels;
  }

  async softDeleteHotel(id: number) {
    const hotel = await Hotels.findByPk(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    hotel.deleted_at = new Date();
    await hotel.save();
    return true;
  }
}

export default HotelRepository;

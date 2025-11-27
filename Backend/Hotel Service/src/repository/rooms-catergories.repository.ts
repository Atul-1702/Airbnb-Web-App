import RoomCategories from "../sequelize/models/room-categories.model";
import BaseRepository from "./base.repository";

class RoomCategoriesRepository extends BaseRepository<RoomCategories> {
  constructor() {
    super(RoomCategories);
  }
}

export default RoomCategoriesRepository;

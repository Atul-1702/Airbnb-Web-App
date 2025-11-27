import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

enum RoomType {
  DELUXE,
  SUITE,
  EXECUTIVE,
  SINGLE,
  DOUBLE,
}

class RoomCategories extends Model<
  InferAttributes<RoomCategories>,
  InferCreationAttributes<RoomCategories>
> {
  declare id: CreationOptional<number>;
  declare room_type: RoomType;
  declare price: number;
  declare room_count: number;
  declare hotel_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

RoomCategories.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    room_type: {
      type: DataTypes.ENUM("DELUXE", "SUITE", "EXECUTIVE", "SINGLE", "DOUBLE"),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    room_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: sequelize,
    tableName: "room_categories",
    timestamps: true,
  }
);

export default RoomCategories;

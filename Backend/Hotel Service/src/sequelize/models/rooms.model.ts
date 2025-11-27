import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class Rooms extends Model<
  InferAttributes<Rooms>,
  InferCreationAttributes<Rooms>
> {
  declare id: CreationOptional<number>;
  declare room_category: CreationOptional<number>;
  declare date_of_availabilty: CreationOptional<Date>;
  declare booking_id: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

Rooms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    room_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_availabilty: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "rooms",
    sequelize: sequelize,
    timestamps: true,
  }
);

export default Rooms;

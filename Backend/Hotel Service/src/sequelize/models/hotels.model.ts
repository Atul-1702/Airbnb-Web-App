import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "./sequelize";

class Hotels extends Model<
  InferAttributes<Hotels>,
  InferCreationAttributes<Hotels>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare pincode: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
  declare rating: CreationOptional<number | null>;
  declare rating_count: CreationOptional<number | null>;
}

Hotels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
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
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    rating_count: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    tableName: "hotels",
    sequelize: sequelize,
    underscored: true,
    timestamps: true,
  }
);

export default Hotels;

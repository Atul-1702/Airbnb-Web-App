import {
  CreationAttributes,
  Model,
  ModelStatic,
  WhereOptions,
} from "sequelize";

abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findById(id: number): Promise<T | null> {
    const record: T | null = await this.model.findByPk(id);
    return record;
  }
  async findAll(): Promise<T[] | null> {
    const allRecords: T[] | null = await this.model.findAll();
    return allRecords;
  }

  async delete(options: WhereOptions<T>): Promise<number> {
    const deletedRecord: number = await this.model.destroy({
      where: options,
    });
    return deletedRecord;
  }

  async update(options: WhereOptions<T>, data: Partial<T>): Promise<number> {
    const updatedRecord: [number] = await this.model.update(data, {
      where: options,
    });
    return updatedRecord[0];
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    const newRecord = await this.model.create(data);
    return newRecord;
  }
}

export default BaseRepository;

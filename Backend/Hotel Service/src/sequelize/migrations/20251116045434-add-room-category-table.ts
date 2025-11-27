import { QueryInterface } from "sequelize";
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
        CREATE TABLE IF NOT EXISTS room_categories(
           id INT PRIMARY KEY,
           room_type ENUM('DELUXE','SUITE','EXECUTIVE','SINGLE','DOUBLE') NOT NULL,
           price FLOAT NOT NULL,
           room_count INT NOT NULL,
           hotel_id INT NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(
      `DROP TABLE IF EXISTS room_categories;`
    );
  },
};

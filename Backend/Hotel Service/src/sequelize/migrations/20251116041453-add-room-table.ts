import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
       CREATE TABLE IF NOT EXISTS rooms(
        id INT PRIMARY KEY,
        hotel_id INT NOT NULL,
        room_category INT,
        date_of_availabilty Date NOT NULL,
        booking_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
       );
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
       DROP TABLE IF EXISTS rooms;
      `);
  },
};

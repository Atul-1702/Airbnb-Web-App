import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
       CREATE TABLE IF NOT EXISTS hotels(
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(200) NOT NULL,
         address VARCHAR(255) NOT NULL,
         pincode INT UNSIGNED NOT NULL,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
       );
      `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXITS hotels;
      `);
  },
};

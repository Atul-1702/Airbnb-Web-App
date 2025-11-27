import { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
            ALTER TABLE room_categories
            ADD CONSTRAINT fk_room_categories_hotel 
            FOREIGN KEY (hotel_id) REFERENCES hotels(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE;             
        `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
         ALTER TABLE room_categories
         DROP FOREIGN KEY fk_room_categories_hotel;
      `);
  },
};

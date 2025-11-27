import { QueryInterface } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
          ALTER TABLE rooms 
          ADD CONSTRAINT fk_rooms_rooms_categories
          FOREIGN KEY (room_category) 
          REFERENCES room_categories(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
          ;
        `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
        ALTER TABLE rooms 
        DROP FOREIGN KEY fk_rooms_rooms_categories;
      `);
  },
};

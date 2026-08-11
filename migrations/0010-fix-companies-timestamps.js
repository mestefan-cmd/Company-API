'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE companies CHANGE `createdAt` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE companies CHANGE `updatedAt` `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;'
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE companies CHANGE `created_at` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;'
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE companies CHANGE `updated_at` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;'
    );
  }
};

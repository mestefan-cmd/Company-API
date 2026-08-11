'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('companies', [
      {
        name: 'Bank Al Ethiad',
        email: 'BAE@tech.com',
        address: 'KHBP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Oracle',
        email: 'contact@oracle.com',
        address: 'KHBP',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', {
      name: ['Bank Al Ethiad', 'Oracle']
    }, {});
  }
};

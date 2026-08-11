'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Backend' },
      { name: 'Frontend' },
      { name: 'DevOps' },
      { name: 'Quality Assurance' },
      { name: 'Data Science' },
      { name: 'Mobile Development' },
      { name: 'Product Management' },
      { name: 'UX/UI Design' },
      { name: 'Cyber Security' },
      { name: 'Cloud Architecture' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {
      name: [
        'Backend',
        'Frontend',
        'DevOps',
        'Quality Assurance',
        'Data Science',
        'Mobile Development',
        'Product Management',
        'UX/UI Design',
        'Cyber Security',
        'Cloud Architecture'
      ]
    }, {});
  }
};

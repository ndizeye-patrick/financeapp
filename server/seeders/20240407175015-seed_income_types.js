'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Income_types', [
      {
        income_type: 'Salary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        income_type: 'Bonus',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more income types as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Income_types', null, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Expense_types', [
      {
        expense_type: 'Travel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        expense_type: 'Food',
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
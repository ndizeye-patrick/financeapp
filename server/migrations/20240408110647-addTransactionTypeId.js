'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Transactions', 'transaction_type_id',{
    type:Sequelize.INTEGER,
    allowNull:false,
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions', 'transaction_type_id');
  }
};

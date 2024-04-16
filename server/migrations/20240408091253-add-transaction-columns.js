'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Transactions','type',{
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Transactions','user_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Transactions','user_id')
    await queryInterface.removeColumn('Transactions','type') 
  }
};

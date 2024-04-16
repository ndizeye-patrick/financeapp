'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Expense_type extends Model {
    static associate(models) {
      Expense_type.hasMany(models.Transaction, {
        foreignKey: 'transaction_type_id',
        as: 'transactions',
      });
    }
  }

  Expense_type.init({
    expense_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Expense_type',
  });

  return Expense_type;
};
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Income_type extends Model {
    static associate(models) {
      Income_type.hasMany(models.Transaction, {
        foreignKey: 'transaction_type_id',
        as: 'transactions',
      });
    }
  }

  Income_type.init({
    income_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Income_type',
  });

  return Income_type;
};
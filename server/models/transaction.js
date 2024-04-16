'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      // Transaction.belongsTo(models.Company, {
      //   foreignKey : 'company',
      //   as: 'company'
      // })

      Transaction.belongsTo(models.Expense_type, {
        foreignKey: 'transaction_type_id',
        as: 'expenseType',
      });

      Transaction.belongsTo(models.Income_type, {
        foreignKey: 'transaction_type_id',
        as: 'incomeType',
      });
    }
  }

  Transaction.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('expense', 'income'),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};
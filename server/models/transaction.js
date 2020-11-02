"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      Transaction.belongsTo(models.User, {
        as: "sender",
        foreignKey: {
          name: "from",
        },
      });
      Transaction.belongsTo(models.User, {
        as: "receiver",
        foreignKey: {
          name: "to",
        },
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      trx: DataTypes.STRING,
      type: DataTypes.INTEGER,
      ammount: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
      from: DataTypes.INTEGER,
      current: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

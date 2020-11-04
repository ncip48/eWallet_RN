"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, {
        as: "transactions",
        foreignKey: {
          name: "userId",
        },
      });
      User.hasMany(models.Notification, {
        as: "notification",
        foreignKey: {
          name: "userId",
        },
      });
      User.hasMany(models.Topup, {
        as: "topup",
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  User.init(
    {
      uid: DataTypes.STRING,
      pin: DataTypes.STRING,
      saldo: DataTypes.INTEGER,
      role: DataTypes.INTEGER,
      email: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

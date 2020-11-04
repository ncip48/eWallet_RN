"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topup.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "uid",
        },
      });
    }
  }
  Topup.init(
    {
      userId: DataTypes.INTEGER,
      notifId: DataTypes.INTEGER,
      txid: DataTypes.STRING,
      orderid: DataTypes.STRING,
      merchantid: DataTypes.STRING,
      ammount: DataTypes.STRING,
      date: DataTypes.DATE,
      status: DataTypes.STRING,
      qr: DataTypes.TEXT,
      deeplink: DataTypes.TEXT,
      payment_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Topup",
    }
  );
  return Topup;
};

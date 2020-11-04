"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Topups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      notifId: {
        type: Sequelize.INTEGER,
      },
      txid: {
        type: Sequelize.STRING,
      },
      orderid: {
        type: Sequelize.STRING,
      },
      merchantid: {
        type: Sequelize.STRING,
      },
      ammount: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      qr: {
        type: Sequelize.TEXT,
      },
      deeplink: {
        type: Sequelize.TEXT,
      },
      payment_code: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Topups");
  },
};

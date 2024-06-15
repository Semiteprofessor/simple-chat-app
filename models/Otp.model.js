const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Otp = sequelize.define("Otp", {
  otp_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_or_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "REGISTRATION",
  },
  expiryTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '10 MINUTE'"),
  },
});

Otp.removeAttribute("id");

module.exports = Otp;

const { Sequelize } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("user", {
  userId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
      len: [10, 15],
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password_salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    validate: {
      isBoolean: true,
    },
  },
});

module.exports = User;

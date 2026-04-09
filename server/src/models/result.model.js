const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.JSON, // text or JSON
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'results',
});

module.exports = Result;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Experiment = sequelize.define('Experiment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  tableName: 'experiments',
});

module.exports = Experiment;

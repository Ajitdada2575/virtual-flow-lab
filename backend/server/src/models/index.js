const sequelize = require('../config/db');
const User = require('./user.model');
const Booking = require('./booking.model');
const Experiment = require('./experiment.model');
const Result = require('./result.model');

// Define relationships
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Result, { foreignKey: 'userId' });
Result.belongsTo(User, { foreignKey: 'userId' });

Experiment.hasMany(Result, { foreignKey: 'experimentId' });
Result.belongsTo(Experiment, { foreignKey: 'experimentId' });

module.exports = {
  sequelize,
  User,
  Booking,
  Experiment,
  Result,
};

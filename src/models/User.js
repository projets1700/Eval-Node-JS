// Import Sequelize et connexion BDD
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modèle User : id, email, password (hashé), role (agent/chief)
module.exports = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'agent' },
}, { tableName: 'users', timestamps: true, updatedAt: false });

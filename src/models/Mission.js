// Import Sequelize et connexion BDD
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modèle Mission : id, title, description, status, priority, createdBy, assignedTo, createdAt
module.exports = sequelize.define('Mission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
  priority: { type: DataTypes.STRING, allowNull: false, defaultValue: 'medium' },
  // Créateur (chief uniquement)
  createdBy: { type: DataTypes.INTEGER, allowNull: false },
  // Assigné à (agent ou chief)
  assignedTo: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'missions',
  timestamps: true,
  updatedAt: false,
});

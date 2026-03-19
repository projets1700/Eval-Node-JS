// Import Sequelize et connexion BDD
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modèle Message : id, title, content, type, createdBy, createdAt
module.exports = sequelize.define('Message', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  type: { type: DataTypes.STRING, defaultValue: 'public' },
  // Référence vers l'utilisateur créateur
  createdBy: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'messages', timestamps: true, updatedAt: false });

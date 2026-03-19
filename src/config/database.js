// Import Sequelize et path
const { Sequelize } = require('sequelize');
const path = require('path');

// Connexion SQLite (fichier à la racine du projet)
module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
});

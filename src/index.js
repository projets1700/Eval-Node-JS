// Chargement des variables d'environnement (.env)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Message = require('./models/Message');
const User = require('./models/User');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Montage des routes
app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);
app.get('/', (_, res) => res.json({ message: 'API ok' }));

// Démarrage : connexion BDD, sync des modèles, écoute HTTP
async function start() {
  await sequelize.authenticate();
  await User.sync({ alter: true });
  await Message.sync({ alter: true });
  app.listen(process.env.PORT || 3000, () => console.log('Serveur démarré'));
}

start();

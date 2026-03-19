// Import : hash mot de passe (bcrypt) et JWT
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.JWT_SECRET || 'secret-dev';

// Envoie user + token (utilisé par register et login)
function sendAuth(user, res, status = 200) {
  const { id, email, role } = user;
  const token = jwt.sign({ id, email, role }, SECRET, { expiresIn: '7d' });
  res.status(status).json({ user: { id, email, role }, token });
}

// Inscription - POST /auth/register
async function register(req, res) {
  const { email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email et password requis' });
  if (await User.findOne({ where: { email } })) return res.status(409).json({ error: 'Email déjà utilisé' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash, role: role || 'agent' });
  sendAuth(user, res, 201);
}

// Connexion - POST /auth/login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email et password requis' });
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
  sendAuth(user, res);
}

module.exports = { register, login };

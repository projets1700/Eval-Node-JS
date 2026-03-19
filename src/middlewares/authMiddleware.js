// Import JWT pour vérifier les tokens
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret-dev';

// Extrait le token du header Authorization: Bearer <token>
function getToken(req) {
  const h = req.headers.authorization;
  return h?.startsWith('Bearer ') ? h.slice(7) : null;
}

// Auth optionnelle : ajoute req.user si token valide, sinon req.user = null
// Utilisé pour GET /messages/:id (public = pas d'auth, lecture_unique = auth requise)
function optionalAuth(req, res, next) {
  const token = getToken(req);
  if (!token) { req.user = null; return next(); }
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

// Auth obligatoire : 401 si pas de token ou token invalide
// Utilisé pour POST /messages (création réservée aux utilisateurs connectés)
function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ error: 'Authentification requise' });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré' });
  }
}

module.exports = { optionalAuth, requireAuth };

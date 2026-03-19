// Import du modèle Message
const Message = require('../models/Message');
// Types autorisés : public (reste) ou lecture_unique (auto-destruction)
const TYPES = ['public', 'lecture_unique'];

// Créer un message - POST /messages (auth requise)
async function createMessage(req, res) {
  const { title, content, type } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'title et content requis' });
  const t = type || 'public';
  if (!TYPES.includes(t)) return res.status(400).json({ error: 'type: public ou lecture_unique' });

  // createdBy = id de l'utilisateur connecté (req.user fourni par requireAuth)
  const msg = await Message.create({ title, content, type: t, createdBy: req.user.id });
  res.status(201).json(msg);
}

// Liste des messages - GET /messages
async function getAllMessages(req, res) {
  const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
  res.json(messages);
}

// Détail d'un message - GET /messages/:id
async function getMessageById(req, res) {
  const msg = await Message.findByPk(req.params.id);
  if (!msg) return res.status(404).json({ error: 'Message non trouvé' });

  // lecture_unique : auth requise + suppression après lecture
  if (msg.type === 'lecture_unique') {
    if (!req.user) return res.status(401).json({ error: 'Authentification requise' });
    const data = msg.toJSON();
    await msg.destroy();
    return res.json(data);
  }
  res.json(msg);
}

module.exports = { createMessage, getAllMessages, getMessageById };

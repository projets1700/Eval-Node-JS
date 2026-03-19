// Routes messages : POST /messages, GET /messages, GET /messages/:id
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/messageController');
const { optionalAuth, requireAuth } = require('../middlewares/authMiddleware');

// Créer un message (auth requise - section 5)
router.post('/', requireAuth, ctrl.createMessage);
// Liste des messages
router.get('/', ctrl.getAllMessages);
// Détail (optionalAuth : lecture_unique nécessite un token)
router.get('/:id', optionalAuth, ctrl.getMessageById);

module.exports = router;

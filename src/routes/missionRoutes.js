// Routes missions : toutes protégées par auth, création réservée au chief
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/missionController');
const { requireAuth, requireChief } = require('../middlewares/authMiddleware');

// Toutes les routes nécessitent une authentification
router.use(requireAuth);

// POST /missions - Créer (chief uniquement)
router.post('/', requireChief, ctrl.createMission);
// GET /missions - Liste
router.get('/', ctrl.getAllMissions);
// GET /missions/:id - Détail
router.get('/:id', ctrl.getMissionById);
// PATCH /missions/:id - Modifier (assignation, status, etc.)
router.patch('/:id', ctrl.updateMission);

module.exports = router;

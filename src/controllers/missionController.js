// Import des modèles Mission et User
const Mission = require('../models/Mission');
const User = require('../models/User');

// Créer une mission - POST /missions (chief uniquement)
async function createMission(req, res) {
  const { title, description, status, priority, assignedTo } = req.body;
  if (!title) return res.status(400).json({ error: 'title requis' });

  // assignedTo : doit être agent ou chief (règle métier)
  if (assignedTo) {
    const user = await User.findByPk(assignedTo);
    if (!user) return res.status(400).json({ error: 'Utilisateur assigné introuvable' });
    if (!['agent', 'chief'].includes(user.role)) {
      return res.status(400).json({ error: 'assignedTo doit être un agent ou un chief' });
    }
  }

  // Création en base (createdBy = req.user.id fourni par requireAuth)
  const mission = await Mission.create({
    title,
    description: description || null,
    status: status || 'pending',
    priority: priority || 'medium',
    createdBy: req.user.id,
    assignedTo: assignedTo || null,
  });
  res.status(201).json(mission);
}

// Liste des missions - GET /missions
async function getAllMissions(req, res) {
  const missions = await Mission.findAll({ order: [['createdAt', 'DESC']] });
  res.json(missions);
}

// Détail d'une mission - GET /missions/:id
async function getMissionById(req, res) {
  const mission = await Mission.findByPk(req.params.id);
  if (!mission) return res.status(404).json({ error: 'Mission non trouvée' });
  res.json(mission);
}

// Modifier une mission - PATCH /missions/:id
async function updateMission(req, res) {
  const mission = await Mission.findByPk(req.params.id);
  if (!mission) return res.status(404).json({ error: 'Mission non trouvée' });

  const { title, description, status, priority, assignedTo } = req.body;

  // assignedTo : doit être agent ou chief, ou null pour désassigner
  if (assignedTo !== undefined) {
    // null = désassigner la mission
    if (assignedTo === null) {
      mission.assignedTo = null;
    } else {
      // Vérifier que l'utilisateur existe et a le bon rôle
      const user = await User.findByPk(assignedTo);
      if (!user) return res.status(400).json({ error: 'Utilisateur assigné introuvable' });
      if (!['agent', 'chief'].includes(user.role)) {
        return res.status(400).json({ error: 'assignedTo doit être un agent ou un chief' });
      }
      mission.assignedTo = assignedTo;
    }
  }

  // Mise à jour des champs fournis
  if (title !== undefined) mission.title = title;
  if (description !== undefined) mission.description = description;
  if (status !== undefined) mission.status = status;
  if (priority !== undefined) mission.priority = priority;

  await mission.save();
  res.json(mission);
}

module.exports = { createMission, getAllMissions, getMissionById, updateMission };

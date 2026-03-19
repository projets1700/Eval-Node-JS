# eval-node-api

Système de transmission sécurisé — API REST

## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

En mode développement (rechargement automatique) :

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3000` par défaut.

## Endpoints principaux

### Authentification

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/register` | Inscription |
| POST | `/auth/login` | Connexion |

Réponse : `{ user: { id, email, role }, token }` — utiliser le token dans `Authorization: Bearer <token>` pour les routes protégées.

### Messages

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/messages` | Créer un message (auth requise) |
| GET | `/messages` | Liste des messages |
| GET | `/messages/:id` | Détail (auth requise si `lecture_unique`) |

### Missions (Partie 2)

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/missions` | Créer une mission (**chief** uniquement) |
| GET | `/missions` | Liste des missions |
| GET | `/missions/:id` | Détail d'une mission |
| PATCH | `/missions/:id` | Modifier une mission (assignation, etc.) |

Toutes les routes missions nécessitent une authentification. La création est réservée au rôle `chief`. L'assignation (`assignedTo`) doit être un `agent` ou un `chief`.

### Exemple inscription / connexion

```json
POST /auth/register
{ "email": "agent@base.local", "password": "secret123", "role": "agent" }

POST /auth/login
{ "email": "agent@base.local", "password": "secret123" }
```

### Exemple création de message

```json
POST /messages
Authorization: Bearer <token>
{ "title": "Titre", "content": "Contenu", "type": "public" }
```

### Exemple création de mission (chief)

```json
POST /missions
Authorization: Bearer <token>
{
  "title": "Opération Alpha",
  "description": "Mission secrète",
  "status": "pending",
  "priority": "high",
  "assignedTo": 2
}
```

## Structure du projet

```
src/
├── config/         # Configuration (base de données)
├── controllers/    # Logique métier
├── middlewares/    # Auth JWT (optionalAuth, requireAuth, requireChief)
├── models/         # Modèles Sequelize
├── routes/         # Définition des routes
└── index.js        # Point d'entrée
```

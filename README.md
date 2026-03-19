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
| POST | `/messages` | Créer un message |
| GET | `/messages` | Liste des messages |
| GET | `/messages/:id` | Détail d'un message (auth requise si `lecture_unique`) |

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
{
  "title": "Titre du message",
  "content": "Contenu du message",
  "type": "public"
}
```

## Structure du projet

```
src/
├── config/         # Configuration (base de données)
├── controllers/    # Logique métier
├── middlewares/    # Auth JWT (optionalAuth, requireAuth)
├── models/         # Modèles Sequelize
├── routes/         # Définition des routes
└── index.js        # Point d'entrée
```

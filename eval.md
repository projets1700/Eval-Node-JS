Parfait, je te refais un sujet propre, fluide, avec une vraie montée en difficulté et une mise en scène immersive.

---

# 🛰️ **TP — Système de transmission sécurisé**

## ⏱️ Durée : 7h

## 🎯 Objectif : concevoir une API REST avec logique métier et sécurité progressive

---

## 📜 **Contexte**

> **Transmission interceptée…**

Vous êtes l’un des derniers opérateurs encore en vie sur une planète hostile.
Votre base est compromise. Vos communications sont surveillées.

Vous disposez d’un unique ordinateur, d’un accès réseau instable… et d’un ancien système de transmission partiellement fonctionnel.

Votre mission :

> **Reconstruire un système de communication sécurisé pour transmettre des informations vers votre planète d’origine, sans que l’ennemi puisse les exploiter.**

Chaque erreur peut être fatale.

---

# ⚙️ **Contraintes techniques**

Vous devez développer une **API REST** avec :

* **Node.js**
* **Express**
* **(au choix)** :

  * **Sequelize + SQL**
  * **MongoDB + Mongoose**

---

---

# 🧩 **PARTIE 1 — Système de transmission**

## 🎯 Objectif

Construire progressivement un système de messages avec des règles de sécurité.

---

# 🧱 **1. Mise en place des transmissions**

> *“Commencez par restaurer les fonctionnalités de base.”*

Créer une ressource **Message**.

### Structure minimale

* `id`
* `title`
* `content`
* `type`
* `createdAt`

### Fonctionnalités

* créer un message
* récupérer la liste des messages
* récupérer un message par son id

---

## 🌐 Routes attendues

* `POST /messages`
* `GET /messages`
* `GET /messages/:id`

(Les autres routes (modifications / suppression) ne sont pas nécessaires pour notre application)

---

# 🔀 **2. Gestion des types de messages**

> *“Tous les messages ne doivent pas survivre.”*

Dans le champ `type` :

* `public`
* `lecture_unique`

Vous pouvez décider de quel type un message est par défaut.

### Règles

#### 🔓 `public`

* accessible normalement
* reste disponible

#### 🔒 `lecture_unique`

* ne doit être lu **qu’une seule fois**

---

# 💣 **3. Auto-destruction**

> *“Certains messages ne doivent laisser aucune trace.”*

Lorsqu’un message `lecture_unique` est consulté :

* il est renvoyé au client
* puis immédiatement supprimé

### Attendu

* première lecture → OK
* deuxième lecture → erreur (404 ou équivalent)

---

# 🔐 **4. Sécurisation du système**

> *“Le système est vulnérable. Restreignez l’accès.”*

Vous devez ajouter une **authentification**.

Votre utilisateur doit avoir un rôle, qui sera utile par la suite.

### Fonctionnalités

* inscription
* connexion
* protection de routes avec middleware

### Contraintes

* mot de passe hashé
* système de token (JWT recommandé)

---

## 🧠 Nouvelles règles

* un message `lecture_unique` :

  * ne peut être lu que si l’utilisateur est **connecté**

---

# 👤 **5. Liaison avec l’utilisateur**

> *“Chaque transmission doit être traçable.”*

Modifier le système pour :

* associer chaque message à un utilisateur

### Ajout

* champ `createdBy`

---

## 🔁 Mise à jour des règles

* un message est toujours lié à son créateur
* seuls les utilisateurs connectés peuvent créer un message

---

# 🚀 **PARTIE 2 — Gestion des missions (bonus)**

> *“Les transmissions ne suffisent plus. Nous devons organiser des opérations.”*

Vous devez ajouter un nouveau module : **les missions**

---

## 🎯 Objectif

Créer une nouvelle ressource avec des règles d’autorisation.

---

# 👤 **1. Rôles utilisateur**

Chaque utilisateur possède un rôle :

### `agent`

* peut être assigné à une mission
* ne peut pas créer de mission

### `chief`

* peut créer des missions
* peut être assigné à une mission

---

# 🛰️ **2. Ressource Mission**

### Structure minimale

* `id`
* `title`
* `description`
* `status`
* `priority`
* `createdBy`
* `assignedTo`
* `createdAt`

---

# 📌 **3. Règles métier**

### Création

* uniquement un utilisateur avec rôle `chief` peut créer une mission

### Assignation

* une mission peut être assignée à :

  * un `agent`
  * un `chief`

### Accès

* toutes les routes missions nécessitent une authentification

---

## 🌐 Routes attendues

* `POST /missions`
* `GET /missions`
* `GET /missions/:id`
* `PATCH /missions/:id`

---

# ⚠️ Points d’attention

* différencier :
  * authentification
  * autorisation
* vérifier les rôles dans les middlewares
* valider les données
* gérer les erreurs proprement

---

# 🧪 **Livrables attendus**

* API fonctionnelle
* routes testables (Postman / Insomnia)
* structure claire :

  * routes
  * controllers
  * models
  * middlewares
* README :
  * installation
  * lancement
  * endpoints principaux

---

# 🛰️ **Dernier message du système**

> *“Si vous avez réussi, le système est de nouveau opérationnel.”*
> *“Les transmissions peuvent reprendre.”*

Bon courage.

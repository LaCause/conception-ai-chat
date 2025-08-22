# 📖 README — Idea → Mockup Generator

## 🚀 Objectif

Cet outil transforme une **idée d’application décrite en langage naturel** en un **mockup visuel interactif**.  
Il permet à toute personne (designer, dev, client) de visualiser rapidement son concept sans passer par Figma ou un long prototypage.

---

## 🛠️ Stack Technique

- **Next.js 14** (App Router, SSR)
- **Tailwind CSS v4** (thème light/dark avec CSS variables)
- **Framer Motion** (animations, slide-in)
- **Lucide React** (icônes modernes)
- **Middleware** pour rediriger les nouveaux visiteurs vers `/onboarding`
- **LocalStorage + Share URL** pour persister et partager son mockup

---

## 📦 Installation

```bash
npm install && npm run dev
```

Le site sera dispo sur [http://localhost:3000](http://localhost:3000).

---

## ✨ Fonctionnalités

### 📝 Composer façon ChatGPT

- Décrivez votre idée en langage naturel.
- **Entrée** → envoie la requête.
- **Shift+Entrée** → nouvelle ligne.
- Raccourci **⌘K** → focus dans le champ.

### 🎨 Génération de blocs

- Chaque requête produit des **UI Blocks** (Hero, Search, List, Form, etc.).
- Détection du **sujet** → application d’un **thème de couleurs** adapté (fintech = vert, santé = bleu, recettes = orange…).

### 📱💻 Preview

- **Mobile** : rendu dans un DeviceFrame compact.
- **Desktop** : rendu sur un fond checkerboard responsive.
- **Switch** entre Mobile / Desktop / Both grâce aux contrôles du header.

### 🛠️ Inspector

- Sélection d’un bloc → panneau latéral animé qui s’ouvre.
- Édition des propriétés du bloc (titre, description…).
- Suppression d’un bloc.
- Boutons ↑ ↓ pour réordonner.

### 🌗 Dark / Light Mode

- Toggle en haut à droite.
- Persistance dans `localStorage`.
- Transitions douces entre les thèmes.

### 📂 Persistance & Partage

- État sauvegardé automatiquement en `localStorage`.
- Bouton **Partager** → génère une URL unique encodée.
- Bouton **Réinitialiser** → supprime la persistance et repart de zéro.

### 🧑‍🏫 Onboarding

- Première visite → redirection automatique vers `/onboarding` (via middleware).
- Cookie `visited` défini une fois l’onboarding terminé.

---

## 🧪 Exemples de requêtes

Taper dans le champ :

- **“Une app de fitness pour suivre mes séances et mes progrès.”**  
  👉 Génère un Hero + Liste d’exercices + CTA, thème vert punchy.

- **“Application de recettes avec un moteur de recherche et des fiches détaillées.”**  
  👉 Génère Search + Card Grid + Detail, thème orange chaleureux.

- **“Plateforme d’éducation avec un feed de cours et une inscription.”**  
  👉 Génère Hero + List + Form, thème violet/bleu.

- **“Un outil de finance perso pour gérer mon budget et voir mes dépenses.”**  
  👉 Génère Dashboard (List + Graph) + CTA Bar, thème vert confiance.

---

## ✅ Roadmap possible

- [ ] Améliorer le Design system
- [ ] Améliorer l'architecture
- [ ] Ajouter les tests unitaires
- [ ] Ajouter un export PNG / PDF des mockups.
- [ ] Intégrer un mode “collaboration” temps réel.
- [ ] Support plus poussé des thèmes personnalisés.
- [ ] Composants avancés (Charts, Calendrier, etc.).
- [ ] Ajouter un storybook.

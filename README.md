# Conception AI – De l’idée au mockup

> Une application Next.js qui permet de transformer une simple description en **mockup interactif**.  
> L’utilisateur décrit son idée en langage naturel et obtient une maquette (UI blocks dynamiques) générée automatiquement.

# Available Scripts

## Development

```bash
# Start Next.js in development mode
npm run dev
```

## Build & Production

```bash
# Build the Next.js app
npm run build

# Start the app in production mode
npm run start
```

## Lint & Type Checking

```bash
# Run ESLint
npm run lint

# Fix ESLint errors automatically
npm run lint:fix

# Run TypeScript type checking
npm run typecheck

# Run lint and typecheck together
npm run check
```

## Tests

```bash
# Run all tests
npm run test

# Run only Design System tests
npm run test:ds

# Run only domain tests
npm run test:domain

# Run only Storybook tests
npm run test:sb

# Run Design System tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage
```

## Storybook

```bash
# Start Storybook in development mode
npm run storybook

# Build static Storybook
npm run storybook:build
```

---

## 🚀 Fonctionnalités principales

### Génération de mockups

- Champ de saisie type **ChatGPT** (`Composer`) pour décrire une idée.
- Détection de contexte (`fintech`, `ecommerce`, `social`, etc.) et application dynamique de **couleurs**/thèmes.
- Les idées sont transformées en une liste de `UIBlock` affichés dans le `MockupCanvas`.

### Aperçus multi-devices

- **Mobile** : rendu dans un `DeviceFrame`.
- **Desktop** : rendu dans un `DesktopFrame` avec chrome navigateur simulé.
- Mode **both** pour voir les deux en parallèle.
- Contrôlé via `ViewControls` (📱/💻/⬛).

### Edition des blocs

- Chaque bloc est rendu par `BlockRenderer` et ses sous-composants (`BlockHeader`, `BlockHero`, `BlockList`, etc.).
- `Inspector` permet de modifier le **type, titre, description et colonnes** d’un bloc sélectionné.
- Suppression possible bloc par bloc.

### Toolbar et HeaderBar

- `HeaderBar` sticky qui se rétrécit au scroll (compact mode).
- Boutons **Partager / Réinitialiser / ThemeToggle** (dark/light).
- `Toolbar` pour appliquer rapidement des raffinements :
  - ➕ Ajouter un formulaire
  - 🎴 Mettre l’accent sur les cartes
  - 📰 Ajouter un feed d’articles
- Export du mockup en **JSON**.

### Onboarding

- Middleware qui redirige un utilisateur qui n’a **jamais visité** vers `/onboarding`.
- Une fois passé, l’utilisateur arrive sur `/`.

### Design System

- **Boutons (`Button`)** : variantes (`primary`, `secondary`, `ghost`, `danger`), tailles (`sm`, `md`, `lg`), icônes gauche/droite, état `loading`.
- **Cards (`Card`, `CardTitle`, `CardDescription`)**.
- **ProgressBar**.
- **SegmentControl** (switch horizontal accessible).
- **ThemeToggle** (clair/sombre, persistant via `localStorage`).
- Tous ces composants sont testés et documentés via **Storybook**.

---

## 🛠️ Tech Stack

- **Framework** : Next.js 14 (App Router)
- **Style** : Tailwind CSS v4 (avec tokens et dark mode via `:root.dark`)
- **Langage** : TypeScript strict
- **Design System** : composants réutilisables dans `/src/design-system`
- **Tests** : Vitest + React Testing Library
- **Documentation UI** : Storybook (`@storybook/nextjs-vite`)

---

## ✅ Tests

Nous avons mis en place des tests unitaires sur les composants **UI** et **métier** :

- `Button.test.tsx` → variantes, icônes, état `loading`
- `Card.test.tsx` → rendu titre/description, classes custom
- `ProgressBar.test.tsx` → clamp de valeurs, affichage %
- `SegmentControl.test.tsx` → sélection et aria-pressed
- `ThemeToggle.test.tsx` → bascule light/dark avec localStorage
- `BlockRenderer.test.tsx` → rend les bons sous-blocs, fallback inconnu
- `MockupCanvas.test.tsx` → sélection de blocs, réordonnancement, highlight
- `Inspector.test.tsx` → édition type, titre, desc, colonnes, suppression
- `HeaderBar.test.tsx` → compact vs non-compact, Toolbar, ViewControls
- `Composer.test.tsx` → auto-resize, soumission clavier, troncature à 1000 chars
- `Toolbar.test.tsx` → boutons rapides et export JSON

---

## 📖 Exemples d’utilisation

### Décrire une idée

Dans le champ :

```
Une app fintech avec un dashboard de comptes et un formulaire de transfert d’argent
```

Résultat :

- Bloc `HEADER` → “Fintech App”
- Bloc `HERO` → “Gérez vos finances en toute simplicité”
- Bloc `CARD_GRID` → Dashboard de comptes
- Bloc `FORM` → Formulaire de transfert

---

### Ajouter un feed

En cliquant sur ➕ Feed dans la toolbar → insertion d’un bloc `LIST` en bas du mockup.

---

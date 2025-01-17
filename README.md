# A11yGazer

Outil d'aide à la production de rapports d'accessibilités

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Présentation générale de l'outil

### Vues

- Menu Principal
- Projet
  - Sommaire
  - Problèmes
    - Liste
    - Grille
    - Tableur
  - Rapport


## TODO

- Prise en charge des images
- Gestion des pages cassée
- Définir les sections de description pour les projets
  - Moteur de template (simple)?
- Checklists par projet
- PWA avec sync des données
- Prise en charge des couleurs + icônes pour les tags
- Génération du rapport

## Notes

- Possibilité d'avoir des formulaires avec *floating labels*
- Créer une liste de tags de base
- Issue model - timestamp pour *resolved*

## Bugs

- Plus possible d'ouvrir des modals si précédemment fermés avec <kbd>Esc</kbd>
- Overwrite des Issues si Projet mis à jour

## Limitations actuelles

- Pas de sessions utilisateur (accès à tout pour tous + pas de maj dynamique)
- 
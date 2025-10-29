Carnet de bord – Journée 02


## Ce que j’ai mis en place techniquement

- Création du composant "Markdown.svelte" pour afficher du contenu Markdown via `svelte-exmarkdown`
- Intégration de ce composant dans `App.svelte` pour afficher dynamiquement la réponse de l’API Mistral
- Mise en place d’un formulaire avec liaison `bind:value` pour envoyer un message à l’API
- Stockage du token API dans `localStorage`
- Appel `fetch` vers l’API Mistral (succès) avec gestion de la réponse (problème affichage suite au manque de component markdown)


## Points de blocage rencontrés

- Confusion entre chaîne et tableau dans la variable `messageAPI` (initialement déclarée comme tableau)
- Mauvaise utilisation de `{#each}` sur une chaîne Markdown
- Difficulté à afficher correctement le Markdown avec le composant "Markdown" dans mon affichage en boucle (j'ai abandonné par manque de temps)
- Quelques hésitations sur l’emplacement du composant dans l’arborescence (pour la création du component Markdown)
- Difficulté à faire une requête HTTP à l'API Mistral selon l'architecture demandée (syntaxe différente des exemples vues en cours)
- Ajouter un historique des messages (tableau de réponses Markdown)
- Dossiers corrompus (commandes git non-fonctionnelles)


## Prochaines étapes envisagées

- Créer un tableau `messageAPI = $state([])` pour gérer plusieurs réponses
- Ajouter un bouton “Réinitialiser le chat”
- Intégrer des fichiers `.md` externes pour tester le rendu Markdown
- Documenter chaque composant dans un dossier `docs/` ou `fiches/`

## Ce que j’aurais fait avec plus de temps
- Prendre de l'avance sur le jour 3
- Améliorer le rendu du CSS

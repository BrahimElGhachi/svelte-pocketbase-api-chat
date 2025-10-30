Carnet de bord – Journée 03


## Ce que j’ai mis en place techniquement

- Installation du serveur pocketbase dans le terminal de la VM
- Création d'une collection dans pocketbase selon le standard défini dans l'énoncé (content + un fied pour le booléen)
- Création d'une fonction utilisant "fetch" pour requete vers PB (pocketbase) -> connexion réussie
- Etape 2 réussi dans l'ensemble sauf l'affichage selon l'historique


## Points de blocage rencontrés

- Difficulté à établir le nombre de fonctions pour le stockage vers PB (idée de départ : un fonction pour stockage réponse user et une pour stockage IA). 
Le choix s'est porté vers une autre fonction à deux paramètres (content, user ou ia)
- Difficulté à afficher messages dans l'ordre chronologique
- Difficulté à établir la connexion avec PB (plusieurs essais car URL difficile à déterminer)
- Perte de temps sur la syntaxe, sur l'installation de PB (retour sur les notes et les replays sur le fonctionnement de ce serveur)
- Intégrer des fichiers `.md` externes pour tester le rendu Markdown

## Prochaines étapes envisagées

- Créer un tableau pour stockage des messages (user et IA)
- Déterminer la manière dont les conversations seront affichés à l'écran

## Ce que j’aurais fait avec plus de temps
- Prendre de l'avance sur le jour 4
- Améliorer le rendu du CSS

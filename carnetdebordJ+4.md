# Carnet de bord – Journée 4

## Ce que j’ai mis en place techniquement

- Création d’un système de conversations avec une structure "conversations = $state([...])" "contenant "id", title", messages[], et "active"
- Mise en place d’une sidebar dynamique affichant tous les chats existants, avec un bouton pour créer une nouvelle conversation à chaque fois
- Fonction newConversation() qui génère un nouvel ID, désactive les autres, et initialise une nouvelle session
- Fonction selectConversation(id) qui active la bonne conversation et affiche ses messages
- Intégration de l’API Mistral avec envoi du contexte conversationnel complet ("messages: activeConversation.messages")
- Enregistrement des messages utilisateur et IA dans PocketBase via "saveMessageToPocketbase(content, messageinput ou isAiResponse)"
- Chargement initial des messages depuis PocketBase avec "loadMessages()" dans "onMount"
- Mise à jour de l’état local "currentConversation" après chaque échange


## Ce que je voulais faire mais que je n’ai pas eu le temps de faire

- Créer une collection "Conversations" dans PocketBase pour stocker chaque session de chat (mauvaise compréhension de l'énoncé)
- Lier chaque message à une conversation via un champ relationnel "conversation_id"
- Filtrer les messages par conversation dans "loadMessages()" avec "?filter=(conversation='id')"
- Ajouter la suppression d’une conversation
- Permettre l’affichage/masquage de la sidebar
- Styliser davantage les messages (bulles, avatars, timestamps), interface plutot "kitch" :-)
- Utiliser des états partagés pour les différentes fonctions (manque de pratique et peur de planter tout le code)


## Points de blocage ou choix techniques

- Actuellement, toutes les conversations sont stockées uniquement en local dans "conversations[]", sans persistance dans PocketBase
- Les messages sont bien enregistrés dans PocketBase, mais pas dans un lien "conversation", ce qui empêche le filtrage
- Le chargement initial ("loadMessages") affiche tous les messages, sans distinction de conversation
- Choix de garder la logique simple pour valider le fonctionnement avant d’ajouter la persistance des conversations

## Ce que je referais différemment

- Créer une collection "Conversations" dès le début pour éviter le couplage local
- Utiliser des composants Svelte séparés pour la sidebar, le chat, et le formulaire


## Prochaines étapes si j’avais eu plus de temps

- Lier chaque message à une conversation dans PocketBase
- Filtrer les messages dans "loadMessages()" selon la conversation active
- Ajouter la suppression d’une conversation avec confirmation
- Travailler le style de mon interface et la rendre visuellement plus belle

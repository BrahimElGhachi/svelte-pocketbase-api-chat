# O'Chat – Application de chat IA avec Svelte & PocketBase

## Objectif du projet
Ce projet illustre ma capacité à concevoir une application front‑end complète en **Svelte**, intégrant une **API d’intelligence artificielle (Mistral)** et une **base de données PocketBase** pour la persistance des messages.  
Il s’agit d’un exercice pratique pour mettre en œuvre la gestion d’état, l’intégration d’API, la structuration en composants et le design responsive.

---

## Ce que j’ai réalisé
- Mise en place d’un **système de multi‑conversations** avec création, sélection et gestion de plusieurs chats en parallèle.  
- Intégration de l’**API Mistral** pour envoyer le contexte conversationnel complet et afficher les réponses de l’IA.  
- Sauvegarde des échanges (utilisateur et IA) dans **PocketBase**, avec distinction grâce à un champ booléen.  
- Utilisation de **Markdown** pour enrichir l’affichage des réponses.  
- Conception d’une **interface responsive** avec Flexbox et media queries, adaptée aux écrans desktop et mobile.  
- Organisation du projet en plusieurs fichiers (`App.svelte`, `main.js`, `app.css`, `Markdown.svelte`) pour plus de clarté et de modularité.

---

## Compétences mises en œuvre
- **Svelte** : gestion des états réactifs et composants modulaires.  
- **PocketBase** : persistance des données et gestion d’une API REST.  
- **API externe (Mistral)** : intégration et traitement des réponses JSON.  
- **CSS moderne** : Flexbox, media queries, design responsive.  
- **JavaScript ES6+** : logique applicative et gestion des appels réseau.

---

## Ce que ce projet démontre
- Ma capacité à **concevoir une application complète** de bout en bout.  
- Mon aptitude à **intégrer des API externes** et gérer des données dynamiques.  
- Mon sens de la **structuration du code** et de l’organisation en composants.  
- Mon souci de l’**expérience utilisateur** avec une interface claire et responsive.  

---

## Améliorations envisagées
- Créer une collection `Conversations` dans PocketBase pour relier les messages à chaque session.  
- Filtrer les messages par conversation active.  
- Ajouter la suppression de conversation avec confirmation.  
- Améliorer le style visuel (bulles de chat, avatars, timestamps).  
- Documenter chaque composant dans un dossier `docs/`.

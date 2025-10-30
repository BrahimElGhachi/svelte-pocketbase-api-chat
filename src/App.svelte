<script>
  import { onMount } from "svelte";
  import "./app.css";
  import Markdown from "svelte-markdown";


  // Stockage du token d'identification
  localStorage.setItem("token", "Q9FnG4UW8dtBzbSHZuGixLL2JdkuLs1r");
  const token = localStorage.getItem("token");

  // Texte saisi par l'utilisateur dans le formulaire
  let messagesInput = $state("");

  // Messages de la conversation en cours (actuellement affichée à l'écran)
  let currentConversation = $state([]);

  // Historique complet de toutes les conversations. La clé "active = true" corresponds à la discussion en cours
  let conversations = $state([
    {
      id: 1,
      title: "Chat 1",
      messages: [], // Tableau qui va stocker les messages contenus dans la variable "messageInput" (message du user)
      active: true,
    },
  ]);

  // Fonction pour envoyer le message à l'API et enregistrer la réponse
  async function handleSubmitForm(event) {
    event.preventDefault();

    const activeConversation = conversations.find((c) => c.active); // Variable défini si la discussion en cours a la valeur "true" et quel chat elle se trouve (chat1 ou chat2 ou chat3)

    // Ajout du message utilisateur
    const userMessage = { role: "user", content: messagesInput }; // Variable qui stocke le message du user selon le standard de Mistral
    activeConversation.messages.push(userMessage); // Etape pour stocker dans le tableau message chaque message tapé par l'utilisateur
    await saveMessageToPocketbase(messagesInput, false); // fonction qui prends en paramètre le message du user + false (et stocke dans pocketbase chaque message du user avec un statut false)


    // Envoi à l'API Mistral
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "mistral-medium-latest",
        messages: activeConversation.messages, // envoi à l'API Mistral le message de l'utilisateur dans la discussion courante
      }),
    });

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "Pas de réponse reçue.";


    //Ajout du message de l'IA
    const aiMessage = { role: "assistant", content: aiContent }; // Variable qui stocke le message de l'IA 
    activeConversation.messages.push(aiMessage); // Etape pour stocker dans le tableau message chaque message reçu de l'IA
    await saveMessageToPocketbase(aiContent, true); // fonction qui prends en paramètre le message de l'IA + true (et stocke dans pocketbase chaque message de l'IA avec un statut true)

    //Mise à jour de la conversation affichée
    currentConversation = activeConversation.messages; // création d'une variable qui affiche à l'écran la conversation entre le user et l'IA

    //Vide l’input
    messagesInput = ""; // vide le formulaire après chaque requête
  }

  // Fonction pour enregistrer un message dans Pocketbase 
  async function saveMessageToPocketbase(content, isAiResponse = false) {
    await fetch(
      "http://127.0.0.1:8090/api/collections/MessageMistralStorage/records",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ content, is_ai_response: isAiResponse }),// -> enregiste les valeurs dans pocketbase selon le standard de la collection (content + false); IsAiResponse est défini comme false en paramètre et chaque message du user sera enregistré en false
      }
    );
  }

  // Charger tous les messages depuis Pocketbase
  async function loadMessages() {
    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/MessageMistralStorage/records"
    );
    const data = await response.json();

    // Recupères les échanges entre l'IA et le user dans pocketbase
    currentConversation = data.items.map((item) => ({
      role: item.is_ai_response ? "assistant" : "user", 
      content: item.content,
    }));
  }

  
  onMount(() => {
    loadMessages();
  });


  // fonction pour changement de conversation
  function selectConversation(id) {
    conversations.forEach((c) => (c.active = c.id === id));
    const selected = conversations.find((c) => c.id === id);
    currentConversation = selected.messages;
  }


  // Créer une nouvelle conversation
  function newConversation() {
    const newId = conversations.length + 1;
    conversations.forEach((c) => (c.active = false));
    conversations.push({
      id: newId,
      title: `Chat ${newId}`,
      messages: [],
      active: true,
    });
    currentConversation = [];
  }
</script>

<div class="layout">
  <header class="header">
    <div class="logo-area">
      <img src="/chat.jpeg" alt="Logo chat" class="logo" />
      <h1 class="app-title">O'CHAT</h1>
    </div>
    <div class="title-area">
      <h2 class="chat-title">Bienvenue sur O'Chat</h2>
    </div>
  </header>

  <section class="main">
    <!-- Sidebar -->
    <aside class="sidebar">
      {#each conversations as conv}
        <button
          class="chat-button {conv.active ? 'active' : ''}"
          onclick={() => selectConversation(conv.id)}
        >
          {conv.title}
        </button>
      {/each}
      <button class="chat-button new" onclick={newConversation}>
        + Nouvelle conversation
      </button>
    </aside>

    <!-- Zone de chat -->
    <div class="chat">
      <h3>Hello, je suis ton assistant virtuel, comment puis-je t'aider ?</h3>

      <div class="messages-field">
        {#each currentConversation as message}
          <p class={message.role === "user" ? "message-user" : "message-bot"}>
          <Markdown source={message.content} />
          </p>
        {/each}
      </div>

      <!-- Saisie du message dans le formulaire -->
      <footer class="input-area">
        <form onsubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Pose ta question ici"
            class="message-input"
            bind:value={messagesInput}
          />
          <button type="submit" class="send-button">Envoyer</button>
        </form>
      </footer>
    </div>
  </section>
</div>
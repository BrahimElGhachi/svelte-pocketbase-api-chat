<script>
  import { onMount } from "svelte";
  import "./app.css";

  // Stockage du token d'identification
  localStorage.setItem("token", "j9hEz9GGkoYnElQmkGnkXwGTncS3TU2l");
  const token = localStorage.getItem("token");

  // Texte saisi par l'utilisateur
  let messagesInput = $state("");

  // Messages de la conversation en cours
  let currentConversation = $state([]);

  // Historique complet de toutes les conversations
  let conversations = $state([
    {
      id: 1,
      title: "Chat 1",
      messages: [],
      active: true,
    },
  ]);

  // Fonction pour envoyer le message à l'API et enregistrer la réponse
  async function handleSubmitForm(event) {
    event.preventDefault();

    const activeConversation = conversations.find((c) => c.active);

    // 1️⃣ Ajout du message utilisateur
    const userMessage = { role: "user", content: messagesInput };
    activeConversation.messages.push(userMessage);
    await saveMessagetToPocketbase(messagesInput, false);

    // 2️⃣ Envoi à l'API Mistral
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: "mistral-medium-latest",
        messages: activeConversation.messages,
      }),
    });

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "Pas de réponse reçue.";

    // 3️⃣ Ajout du message de l'IA
    const aiMessage = { role: "assistant", content: aiContent };
    activeConversation.messages.push(aiMessage);
    await saveMessagetToPocketbase(aiContent, true);

    // 4️⃣ Mise à jour de la conversation affichée
    currentConversation = activeConversation.messages;

    // 5️⃣ Vide l’input
    messagesInput = "";
  }

  // Fonction pour enregistrer un message dans Pocketbase
  async function saveMessagetToPocketbase(content, isAiResponse = false) {
    await fetch(
      "http://127.0.0.1:8090/api/collections/MessageMistralStorage/records",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ content, is_ai_response: isAiResponse }),
      }
    );
  }

  // Charger tous les messages depuis Pocketbase
  async function loadMessages() {
    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/MessageMistralStorage/records"
    );
    const data = await response.json();

    // Tu pourrais ici reconstruire les conversations depuis la base
    currentConversation = data.items.map((item) => ({
      role: item.is_ai_response ? "assistant" : "user",
      content: item.content,
    }));
  }

  onMount(() => {
    loadMessages();
  });

  // Changer de conversation
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
          on:click={() => selectConversation(conv.id)}
        >
          {conv.title}
        </button>
      {/each}
      <button class="chat-button new" on:click={newConversation}>
        + Nouvelle conversation
      </button>
    </aside>

    <!-- Zone de chat -->
    <div class="chat">
      <h3>Hello, je suis ton assistant virtuel, comment puis-je t'aider ?</h3>

      <div class="messages-field">
        {#each currentConversation as message}
          <p class={message.role === "user" ? "message-user" : "message-bot"}>
            {message.content}
          </p>
        {/each}
      </div>

      <!-- Saisie du message -->
      <footer class="input-area">
        <form on:submit={handleSubmitForm}>
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
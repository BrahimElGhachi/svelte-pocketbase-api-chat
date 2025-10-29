<script>
  import { onMount } from "svelte";
  import "./app.css";
  
  // Stockage du token d'identification lors de la connexion vers l'API Mistral
  localStorage.setItem("token", "j9hEz9GGkoYnElQmkGnkXwGTncS3TU2l");
  const token = localStorage.getItem("token");

  // Création de la variable pour envoi du formulaire vers l'API Mistral
  let messagesInput = $state("");

  // Création de la variable pour stocker les réponses de l'API Mistral
  let messageAPI = $state([""]);


  //////////////////////////////////////////////////////////////////////////////////////////


  // Fonction pour envoyer requête (formulaire vers API Mistral)
  async function handleSubmitForm(event) {
    event.preventDefault();

    // 1) Stocker le message utilisateur dans pocketbase
    await saveMessagetToPocketbase(messagesInput, false);

    // 2) Envoyer une question à l'API Mistral
    fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        model: "mistral-medium-latest",
        messages: [{ role: "user", content: (messagesInput)}],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        messageAPI = data.choices[0].message.content;
        console.log(`Réponse IA: ${messageAPI}`);
      });

      // 3) stocker la réponse de l'API Mistral dans pocketbase
      const aiContent = data.choices[0].message.content;
      await saveMessageToPocketbase(aiContent, true);

      // 4) Remettre à jour le chat local
      loadMessages();
  }

    // Fonction pour envoyer le message utilisateur vers Pocketbase
    async function saveMessagetToPocketbase(content, isAiResponse = false) {
  await fetch("http://127.0.0.1:8090/api/collections/MessageMistralStorage/records", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      content,
      is_ai_response: isAiResponse
    })
  });
}
  saveMessagetToPocketbase

  async function loadMessages() {
    const response = await fetch("http://127.0.0.1:8090/api/collections/MessageMistralStorage/records/:id");
    const data = await response.json();
    // trie les messages par ordre chrono; 
    messageAPI = data.items.map(item => item.content);
  }

  // Au démarrage du composant, charge l'historique
  onMount(() => {
    loadMessages();
  });

</script>

<div class="layout">
  <!-- Header -->
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
      <button class="chat-button">Chat 1</button>
      <button class="chat-button">Chat 2</button>
      <button class="chat-button">Chat 3</button>
      <button class="chat-button">Chat 4</button>
    </aside>

    <!-- Chat Content -->
    <div class="chat">
      <h3>Messages</h3>

      <div class="messages-field">
        <p class="message-user">{messagesInput}</p>
        <p class="message-bot">
          {#each messageAPI as message}
          {message}
          {/each}
        </p>
        <p></p>
      </div>

      <!-- Message Input -->

      <footer class="input-area">
        <form onsubmit={handleSubmitForm}>
          <input
            type="text"
            id="messageInput"
            placeholder="Pose ta question içi"
            class="message-input"
            bind:value={messagesInput} />
          <button type="submit" class="send-button">Créer</button>
        </form>
      </footer>
    </div>
  </section>
</div>

<script>
  import { onMount } from "svelte";
  import "./app.css";
  
  localStorage.setItem("token", "j9hEz9GGkoYnElQmkGnkXwGTncS3TU2l");
  const token = localStorage.getItem("token");

  // Création de la variable pour envoi du formulaire vers l'API du Chat
  let messagesInput = $state("");

  // Création d'une variable pour stocker les réponses de l'IA Mistral
  let messageAPI = $state([""]);
  

  // Fonction pour envoyer requête (formulaire vers API Mistral)
  async function handleSubmitForm(event) {
    event.preventDefault(); // Fonction pour envoyer requête (formulaire vers API Mistral)t();

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
  }
  

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

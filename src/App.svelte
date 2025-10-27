<script>
  import "./app.css";
</script>

<main>
  
  <div class="layout">
  <!-- Header -->

  <header class="header">

    <div class="logo-area">
      <img src="" alt="Logo chat" class="logo" />
      <h1 class="app-title">O'CHAT</h1>
    </div>
    
    <div class="title-area">
    <h2 class="chat-title">Chat Title</h2>
    </div>
  </header>

  <main class="main">
    <!-- Sidebar -->
    <aside class="sidebar">
      <button class="chat-item">Chat 1</button>
      <button class="chat-item">Chat 2</button>
      <button class="chat-item">Chat 3</button>
      <button class="chat-item">Chat 4</button>
    </aside>

    <!-- Chat Content -->
    <section class="chat">
      <h3>Messages</h3>

      <div class="messages">
        <div class="message message-left"></div>
        <div class="message message-right"></div>
        <div class="message message-left"></div>
      </div>

      <!-- Message Input -->
      <footer class="input-area">
        <input type="text" placeholder="Message input" class="message-input" />
        <button class="send-button">Créer</button>
      </footer>
    </section>
  </main>
</div>
</main>
<?php include('header.php'); ?>
<div id="content-wrap">
  <div id="input-container" class="container">
    <textarea id="script-text" placeholder="Coloque seu roteiro / guion aqui..."></textarea>
    <div id="timer-config">
      <label for="delay-input">Tiempo (segundos) entre transiciones:</label>
      <input type="number" id="delay-input" value="3" min="1">
    </div>
    <button id="start-btn" class="start-btn" title="Comenzar el Prompter">
        <span class="icon">&#9658;</span>
    </button>

  </div>
  <!-- Overlay del prompter con 3 slots para los textos -->
  <div id="prompter-overlay">
    <div id="prev-text" class="prompter-slot"></div>
    <div id="curr-text" class="prompter-slot"></div>
    <div id="next-text" class="prompter-slot"></div>
  </div>
</div>
<?php include('footer.php'); ?>

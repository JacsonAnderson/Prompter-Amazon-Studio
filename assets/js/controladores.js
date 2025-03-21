document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      // Pausa a transição enquanto a tecla espaço estiver pressionada
      if (window.Prompter && !window.Prompter.getPaused()) {
        window.Prompter.pause();
      }
      e.preventDefault();
    } else if (e.code === "ArrowLeft") {
      // Retrocede um slide
      if (window.Prompter) {
        window.Prompter.regress();
      }
      e.preventDefault();
    } else if (e.code === "ArrowRight") {
      // Avança um slide
      if (window.Prompter) {
        window.Prompter.advance();
      }
      e.preventDefault();
    }
  });
  
  document.addEventListener("keyup", function (e) {
    if (e.code === "Space") {
      // Retoma a transição quando a tecla espaço é liberada
      if (window.Prompter) {
        window.Prompter.resume();
      }
      e.preventDefault();
    }
  });
  
document.addEventListener("DOMContentLoaded", function () {
    const MAX_CHARS = 100; // Limite de caracteres por slide (ajustável)
    let slides = [];
    let currentIndex = 0;
    let displayDelay = 3000; // Tempo de exibição em ms (valor padrão)
    const transitionDuration = 1000; // Duração da animação em ms
    let paused = false;
    let transitionTimeout;
  
    const startBtn = document.getElementById("start-btn");
    const inputContainer = document.getElementById("input-container");
    const scriptText = document.getElementById("script-text");
    const delayInput = document.getElementById("delay-input");
    const prompterOverlay = document.getElementById("prompter-overlay");
  
    const prevElem = document.getElementById("prev-text");
    const currElem = document.getElementById("curr-text");
    const nextElem = document.getElementById("next-text");
  
    // Fragmenta o texto em slides (por parágrafos e palavras)
    function splitTextToSlides(text, maxChars) {
      const paragraphs = text.split("\n").filter(p => p.trim() !== "");
      const result = [];
      paragraphs.forEach(paragraph => {
        if (paragraph.length <= maxChars) {
          result.push(paragraph.trim());
        } else {
          const words = paragraph.split(" ");
          let currentSlide = "";
          words.forEach(word => {
            if ((currentSlide + (currentSlide ? " " : "") + word).length <= maxChars) {
              currentSlide += (currentSlide ? " " : "") + word;
            } else {
              result.push(currentSlide);
              currentSlide = word;
            }
          });
          if (currentSlide) result.push(currentSlide);
        }
      });
      return result;
    }
  
    // Define os estilos padrão para os três slots
    function setDefaultStyles() {
      prevElem.style.top = "15%";
      prevElem.style.fontSize = "1.5em";
      prevElem.style.opacity = "0"; // Slot superior fica invisível por padrão
      prevElem.style.transition = "";
  
      currElem.style.top = "50%";
      currElem.style.fontSize = "2em";
      currElem.style.opacity = "1";
      currElem.style.transition = "";
  
      nextElem.style.top = "85%";
      nextElem.style.fontSize = "1.5em";
      nextElem.style.opacity = "0.7";
      nextElem.style.transition = "";
    }
  
    // Atualiza os textos dos slots e aplica os estilos padrão
    function updateSlots() {
      currElem.innerText = slides[currentIndex] || "";
      prevElem.innerText = (currentIndex - 1 >= 0) ? slides[currentIndex - 1] : "";
      nextElem.innerText = (currentIndex + 1 < slides.length) ? slides[currentIndex + 1] : "";
      setDefaultStyles();
    }
  
    // Anima a transição:
    // - O slot central (currElem) se move para o topo (15%) e faz fade out.
    // - O slot inferior (nextElem) se move para o centro (50%) e faz fade in.
    function animateTransition() {
      if (paused) return; // Se estiver pausado, não faz nada.
  
      // Configura transições para currElem e nextElem
      currElem.style.transition = `top ${transitionDuration}ms ease, font-size ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`;
      nextElem.style.transition = `top ${transitionDuration}ms ease, font-size ${transitionDuration}ms ease, opacity ${transitionDuration}ms ease`;
  
      // Anima o slot central: de 50% para 15% e opacidade de 1 para 0 (fade out)
      currElem.style.top = "15%";
      currElem.style.fontSize = "1.5em";
      currElem.style.opacity = "0";
  
      // Anima o slot inferior: de 85% para 50% e opacidade de 0.7 para 1 (fade in)
      nextElem.style.top = "50%";
      nextElem.style.fontSize = "2em";
      nextElem.style.opacity = "1";
  
      transitionTimeout = setTimeout(() => {
        currentIndex++;
        updateSlots();
        if (currentIndex < slides.length - 1 && !paused) {
          transitionTimeout = setTimeout(animateTransition, displayDelay);
        }
      }, transitionDuration);
    }
  
    // Ao clicar em "Start"
    startBtn.addEventListener("click", function () {
      const text = scriptText.value;
      if (!text.trim()) return;
      displayDelay = (parseInt(delayInput.value, 10) || 3) * 1000;
      slides = splitTextToSlides(text, MAX_CHARS);
      if (slides.length === 0) return;
      inputContainer.style.display = "none";
      prompterOverlay.style.display = "block";
  
      currentIndex = 0;
      updateSlots();
  
      if (slides.length > 1) {
        transitionTimeout = setTimeout(animateTransition, displayDelay);
      }
    });
  
    // Expor a API global "Prompter" para controle externo
    window.Prompter = {
      pause: function() {
        paused = true;
        clearTimeout(transitionTimeout);
      },
      resume: function() {
        if (!paused) return;
        paused = false;
        if (currentIndex < slides.length - 1) {
          transitionTimeout = setTimeout(animateTransition, displayDelay);
        }
      },
      advance: function() {
        clearTimeout(transitionTimeout);
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          updateSlots();
        }
        // Reinicia o contador automático após a ação
        if (!paused && currentIndex < slides.length - 1) {
          transitionTimeout = setTimeout(animateTransition, displayDelay);
        }
      },
      regress: function() {
        clearTimeout(transitionTimeout);
        if (currentIndex > 0) {
          currentIndex--;
          updateSlots();
        }
        // Reinicia o contador automático após a ação
        if (!paused && currentIndex < slides.length - 1) {
          transitionTimeout = setTimeout(animateTransition, displayDelay);
        }
      },
      getPaused: function() {
        return paused;
      }
    };
  });
  
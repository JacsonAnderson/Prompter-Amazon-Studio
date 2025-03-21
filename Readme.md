# Prompter

Uma aplicação web simples de prompter que exibe trechos de texto (slides) com transições automáticas e controle via teclado. O projeto é modularizado utilizando PHP, HTML, CSS e JavaScript e pode ser executado em um container Docker.

## Funcionalidades

- **Fragmentação de Texto:** Divide o roteiro em slides com base em um limite de caracteres configurável.
- **Transições Suaves:** Exibe os slides com transições automáticas (fade e movimento) entre os estados:
  - **Slot Superior:** Exibe o slide anterior (invisível ou com fade out).
  - **Slot Central:** Exibe o slide atual.
  - **Slot Inferior:** Exibe o próximo slide.
- **Controles via Teclado:**
  - **Espaço:** Pausa (enquanto pressionado) e retoma a transição.
  - **Seta Esquerda:** Retrocede para o slide anterior.
  - **Seta Direita:** Avança para o próximo slide.
- **Interface Responsiva e Modo Escuro:** Design baseado em tons escuros para não cansar a vista.
- **Modo de Edição:** Permite voltar à tela de edição do roteiro clicando no botão "X".

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP (para modularização dos templates)
- **Containerização:** Docker (opcional, para facilitar a implantação)

## Pré-requisitos

- [Docker](https://www.docker.com/) (opcional, se preferir rodar em container)
- Servidor web com suporte a PHP (caso não use Docker)

## Instalação

### Usando Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/prompter.git
   cd prompter

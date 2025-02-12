document.addEventListener("DOMContentLoaded", function() {

    // Função para obter parâmetros da URL
    function getQueryParam(param) {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    }
  
    /* ====================
       Página Inicial (index.html)
       ==================== */
    const characterListContainer = document.getElementById("character-list");
    if (characterListContainer) {
      const characters = JSON.parse(localStorage.getItem("characters") || "[]");
      characterListContainer.innerHTML = "";
  
      if (characters.length === 0) {
        characterListContainer.innerHTML = "<p>Nenhum personagem criado.</p>";
      } else {
        characters.forEach(function(character, index) {
          const card = document.createElement("div");
          card.className = "character-card";
  
          // Cria um link que envolve a imagem para direcionar à página de visualização
          const link = document.createElement("a");
          link.href = "view.html?index=" + index;
  
          const img = document.createElement("img");
          img.src = character.imagem;
          img.alt = character.nome;
          img.className = "character-image";
          link.appendChild(img);
  
          const nameEl = document.createElement("h3");
          nameEl.textContent = character.nome;
  
          card.appendChild(link);
          card.appendChild(nameEl);
          characterListContainer.appendChild(card);
        });
      }
    }
  
    /* ====================
       Página de Criação (create.html)
       ==================== */
    const createForm = document.getElementById("create-character-form");
    if (createForm) {
      createForm.addEventListener("submit", function(event) {
        event.preventDefault();
  
        // Cria o objeto personagem com os valores do formulário (incluindo a imagem)
        const character = {
          nome: document.getElementById("nome").value,
          imagem: document.getElementById("imagem").value,
          estilos: {
            poderoso: parseInt(document.getElementById("poderoso").value) || 0,
            ligeiro: parseInt(document.getElementById("ligeiro").value) || 0,
            preciso: parseInt(document.getElementById("preciso").value) || 0,
            capcioso: parseInt(document.getElementById("capcioso").value) || 0
          },
          habilidades: {
            agarrao: parseInt(document.getElementById("agarrao").value) || 0,
            armazenamento: parseInt(document.getElementById("armazenamento").value) || 0,
            assegurar: parseInt(document.getElementById("assegurar").value) || 0,
            busca: parseInt(document.getElementById("busca").value) || 0,
            chamado: parseInt(document.getElementById("chamado").value) || 0,
            cura: parseInt(document.getElementById("cura").value) || 0,
            exibicao: parseInt(document.getElementById("exibicao").value) || 0,
            golpe: parseInt(document.getElementById("golpe").value) || 0,
            manufatura: parseInt(document.getElementById("manufatura").value) || 0,
            estudo: parseInt(document.getElementById("estudo").value) || 0,
            tiro: parseInt(document.getElementById("tiro").value) || 0,
            travessia: parseInt(document.getElementById("travessia").value) || 0
          },
          tracos: document.getElementById("tracos").value,
          utensilio: {
            nome: document.getElementById("nomeUtensilio").value,
            resistencia: parseInt(document.getElementById("resistencia").value) || 0,
            descricao: document.getElementById("descricaoUtensilio").value
          }
        };
  
        const characters = JSON.parse(localStorage.getItem("characters") || "[]");
        characters.push(character);
        localStorage.setItem("characters", JSON.stringify(characters));
  
        // Redireciona automaticamente para a tela inicial
        window.location.href = "index.html";
      });
    }
  
    /* ====================
       Página de Visualização (view.html)
       ==================== */
    const characterDetailsContainer = document.getElementById("character-details");
    if (characterDetailsContainer) {
      const index = getQueryParam("index");
      const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  
      if (index === null || isNaN(index) || index < 0 || index >= characters.length) {
        characterDetailsContainer.innerHTML = "<p>Personagem não encontrado.</p>";
      } else {
        const character = characters[index];
        const detailsHTML = `
          <h2>${character.nome}</h2>
          <img src="${character.imagem}" alt="${character.nome}" class="character-image-large">
          <h3>Estilos</h3>
          <p>Poderoso: ${character.estilos.poderoso}, Ligeiro: ${character.estilos.ligeiro}, Preciso: ${character.estilos.preciso}, Capcioso: ${character.estilos.capcioso}</p>
          <h3>Habilidades</h3>
          <p>
            Agarrão: ${character.habilidades.agarrao}, Armazenamento: ${character.habilidades.armazenamento}, Assegurar: ${character.habilidades.assegurar}, Busca: ${character.habilidades.busca}<br>
            Chamado: ${character.habilidades.chamado}, Cura: ${character.habilidades.cura}, Exibição: ${character.habilidades.exibicao}, Golpe: ${character.habilidades.golpe}<br>
            Manufatura: ${character.habilidades.manufatura}, Estudo: ${character.habilidades.estudo}, Tiro: ${character.habilidades.tiro}, Travessia: ${character.habilidades.travessia}
          </p>
          <h3>Traços</h3>
          <p>${character.tracos}</p>
          <h3>Utensílio</h3>
          <p>Nome: ${character.utensilio.nome}, Resistência: ${character.utensilio.resistencia}<br>
          Descrição: ${character.utensilio.descricao}</p>
        `;
        characterDetailsContainer.innerHTML = detailsHTML;
      }
    }
  });
  
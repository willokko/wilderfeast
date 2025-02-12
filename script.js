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
   Página de Edição (edit.html)
   ==================== */
const editForm = document.getElementById("edit-character-form");
if (editForm) {
  const index = getQueryParam("index");
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  
  if (index === null || isNaN(index) || index < 0 || index >= characters.length) {
    document.body.innerHTML = "<p>Personagem não encontrado.</p>";
    return;
  }

  // Preenche o formulário com os dados existentes
  const character = characters[index];
  document.getElementById("nome").value = character.nome;
  document.getElementById("imagem").value = character.imagem;

  // Preenche os estilos
  document.getElementById("poderoso").value = character.estilos.poderoso;
  document.getElementById("ligeiro").value = character.estilos.ligeiro;
  document.getElementById("preciso").value = character.estilos.preciso;
  document.getElementById("capcioso").value = character.estilos.capcioso;

  // Preenche as habilidades
  document.getElementById("agarrao").value = character.habilidades.agarrao;
  document.getElementById("armazenamento").value = character.habilidades.armazenamento;
  document.getElementById("assegurar").value = character.habilidades.assegurar;
  document.getElementById("busca").value = character.habilidades.busca;
  document.getElementById("chamado").value = character.habilidades.chamado;
  document.getElementById("cura").value = character.habilidades.cura;
  document.getElementById("exibicao").value = character.habilidades.exibicao;
  document.getElementById("golpe").value = character.habilidades.golpe;
  document.getElementById("manufatura").value = character.habilidades.manufatura;
  document.getElementById("estudo").value = character.habilidades.estudo;
  document.getElementById("tiro").value = character.habilidades.tiro;
  document.getElementById("travessia").value = character.habilidades.travessia;

  // Preenche os traços
  document.getElementById("tracos").value = character.tracos;

  // Preenche o utensílio
  document.getElementById("nomeUtensilio").value = character.utensilio.nome;
  document.getElementById("resistencia").value = character.utensilio.resistencia;
  document.getElementById("descricaoUtensilio").value = character.utensilio.descricao;

  // Manipula o envio do formulário de edição
  editForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Atualiza o objeto personagem
    const updatedCharacter = {
      nome: document.getElementById("nome").value.trim(),
      imagem: document.getElementById("imagem").value.trim(),
      estilos: {
        poderoso: Math.max(0, parseInt(document.getElementById("poderoso").value)) || 0,
        ligeiro: Math.max(0, parseInt(document.getElementById("ligeiro").value)) || 0,
        preciso: Math.max(0, parseInt(document.getElementById("preciso").value)) || 0,
        capcioso: Math.max(0, parseInt(document.getElementById("capcioso").value)) || 0
      },
      habilidades: {
        agarrao: Math.max(0, parseInt(document.getElementById("agarrao").value)) || 0,
        armazenamento: Math.max(0, parseInt(document.getElementById("armazenamento").value)) || 0,
        assegurar: Math.max(0, parseInt(document.getElementById("assegurar").value)) || 0,
        busca: Math.max(0, parseInt(document.getElementById("busca").value)) || 0,
        chamado: Math.max(0, parseInt(document.getElementById("chamado").value)) || 0,
        cura: Math.max(0, parseInt(document.getElementById("cura").value)) || 0,
        exibicao: Math.max(0, parseInt(document.getElementById("exibicao").value)) || 0,
        golpe: Math.max(0, parseInt(document.getElementById("golpe").value)) || 0,
        manufatura: Math.max(0, parseInt(document.getElementById("manufatura").value)) || 0,
        estudo: Math.max(0, parseInt(document.getElementById("estudo").value)) || 0,
        tiro: Math.max(0, parseInt(document.getElementById("tiro").value)) || 0,
        travessia: Math.max(0, parseInt(document.getElementById("travessia").value)) || 0
      },
      tracos: document.getElementById("tracos").value.trim(),
      utensilio: {
        nome: document.getElementById("nomeUtensilio").value.trim(),
        resistencia: Math.max(0, parseInt(document.getElementById("resistencia").value)) || 0,
        descricao: document.getElementById("descricaoUtensilio").value.trim()
      }
    };

    characters[index] = updatedCharacter;
    localStorage.setItem("characters", JSON.stringify(characters));
    window.location.href = `view.html?index=${index}`;
  });

  // Botão de exclusão
  document.getElementById("delete-character").addEventListener("click", function() {
    if (confirm("Tem certeza que deseja excluir este personagem permanentemente?")) {
      characters.splice(index, 1);
      localStorage.setItem("characters", JSON.stringify(characters));
      window.location.href = "index.html";
    }
  });

  // Botão de cancelar
  document.getElementById("cancel-edit").addEventListener("click", function() {
    window.location.href = `view.html?index=${index}`;
  });
}

  /* ====================
     Página de Visualização (view.html)
     ==================== */

  const editButton = document.getElementById("edit-button");
  if (editButton) {
    const index = getQueryParam("index");
    editButton.href = `edit.html?index=${index}`;
  }

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
// Função para exportar personagens
function exportCharacters() {
const characters = JSON.parse(localStorage.getItem("characters") || "[]");
const dataStr = JSON.stringify(characters, null, 2);
const dataBlob = new Blob([dataStr], { type: "application/json" });

const url = URL.createObjectURL(dataBlob);
const a = document.createElement("a");
a.href = url;
a.download = `personagens_${new Date().toISOString().split('T')[0]}.json`;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
}

// Função para importar personagens
function importCharacters(file) {
const reader = new FileReader();

reader.onload = function(e) {
  try {
    const importedChars = JSON.parse(e.target.result);
    const existingChars = JSON.parse(localStorage.getItem("characters") || "[]");
    
    // Validação básica da estrutura
    if (!Array.isArray(importedChars) || !importedChars.every(c => c.nome && c.imagem)) {
      throw new Error("Formato de arquivo inválido");
    }
    
    // Mescla os personagens (substitui duplicados pelo nome)
    const mergedChars = [...existingChars];
    importedChars.forEach(newChar => {
      const index = mergedChars.findIndex(c => c.nome === newChar.nome);
      if (index > -1) {
        mergedChars[index] = newChar; // Substitui existente
      } else {
        mergedChars.push(newChar); // Adiciona novo
      }
    });
    
    localStorage.setItem("characters", JSON.stringify(mergedChars));
    alert(`Sucesso! ${importedChars.length} personagens importados.`);
    window.location.reload();
  } catch (error) {
    alert("Erro na importação: " + error.message);
  }
};

reader.readAsText(file);
}

// Adicione no evento DOMContentLoaded (no final do listener principal)
document.getElementById("export-characters")?.addEventListener("click", exportCharacters);
document.getElementById("import-characters")?.addEventListener("click", () => {
document.getElementById("file-input").click();
});
document.getElementById("file-input").addEventListener("change", (e) => {
if (e.target.files[0]) {
  if (confirm("Isso substituirá personagens com nomes iguais. Continuar?")) {
    importCharacters(e.target.files[0]);
  }
}
});

// Função para exportar personagens
function exportCharacters() {
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");
  const dataStr = JSON.stringify(characters, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `personagens_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Função para importar personagens
function importCharacters(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const importedChars = JSON.parse(e.target.result);
      const existingChars = JSON.parse(localStorage.getItem("characters") || "[]");
      
      // Validação básica da estrutura
      if (!Array.isArray(importedChars) || !importedChars.every(c => c.nome && c.imagem)) {
        throw new Error("Formato de arquivo inválido");
      }
      
      // Mescla os personagens (substitui duplicados pelo nome)
      const mergedChars = [...existingChars];
      importedChars.forEach(newChar => {
        const index = mergedChars.findIndex(c => c.nome === newChar.nome);
        if (index > -1) {
          mergedChars[index] = newChar; // Substitui existente
        } else {
          mergedChars.push(newChar); // Adiciona novo
        }
      });
      
      localStorage.setItem("characters", JSON.stringify(mergedChars));
      alert(`Sucesso! ${importedChars.length} personagens importados.`);
      window.location.reload();
    } catch (error) {
      alert("Erro na importação: " + error.message);
    }
  };
  
  reader.readAsText(file);
}

// Adicione no evento DOMContentLoaded (no final do listener principal)
document.getElementById("export-characters")?.addEventListener("click", exportCharacters);
document.getElementById("import-characters")?.addEventListener("click", () => {
  document.getElementById("file-input").click();
});
document.getElementById("file-input").addEventListener("change", (e) => {
  if (e.target.files[0]) {
    if (confirm("Isso substituirá personagens com nomes iguais. Continuar?")) {
      importCharacters(e.target.files[0]);
    }
  }
});

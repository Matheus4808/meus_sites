// --- Carregar dados do backend ---
async function carregarJogadores() {
  try {
    const res = await fetch("/jogadores"); // relativo -> funciona no Render
    if (!res.ok) throw new Error("Erro ao buscar jogadores");
    const jogadores = await res.json();
    return jogadores;
  } catch (err) {
    console.error("Erro ao carregar jogadores:", err);
    return [];
  }
}

async function carregarUltimaPeladinha() {
  try {
    const response = await fetch("/ultimaPeladinha");
    if (!response.ok) throw new Error("Erro ao buscar última peladinha");
    return await response.json();
  } catch (err) {
    console.error("Erro ao carregar última peladinha:", err);
    return { destaques: [], melhorGoleiro: null };
  }
}

// --- Render lista de jogadores ---
const playerList = document.getElementById("playerList");
function renderJogadores(lista) {
  playerList.innerHTML = "";
  lista.forEach(j => {
    const item = document.createElement("div");
    item.classList.add("player-item");
    item.innerText = `${j.nome} (${j.posicao}) - Nota Último Jogo ${j.notaUltimoJogo}`;
    item.addEventListener("click", () => abrirPopupInfo(j));
    playerList.appendChild(item);
  });
}

// --- Popup de informações ---
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
function abrirPopupInfo(j) {
  document.getElementById("popupName").innerText = j.nome;
  document.getElementById("popupOverall").innerText = j.overall;
  document.getElementById("popupPos").innerText = j.posicao;
  document.getElementById("popupIdade").innerText = j.idade;
  document.getElementById("popupJogos").innerText = j.jogos;
  document.getElementById("popupGols").innerText = j.gols;
  document.getElementById("popupAssistencia").innerText = j.assistencia;
  document.getElementById("popupAltura").innerText = j.altura;
  document.getElementById("popupNota").innerText = j.notaUltimoJogo;
  popup.style.display = "flex";
}
closePopup.addEventListener("click", () => popup.style.display = "none");

// --- Render estatísticas ---
const tbody = document.querySelector("#statsTable tbody");
function renderTabela(lista) {
  tbody.innerHTML = "";
  lista.forEach(j => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${j.nome}</td>
      <td>${j.posicao}</td>
      <td>${j.overall}</td>
      <td>${j.gols}</td>
      <td>${j.jogos}</td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Montar Time da Peladinha ---
function montarTime(ultimaPeladinha) {
  const formation = document.getElementById("formation");
  formation.innerHTML = "";

  if (!ultimaPeladinha || !ultimaPeladinha.destaques) return;

  const goleiro = ultimaPeladinha.melhorGoleiro;
  const destaques = ultimaPeladinha.destaques;

  const top = document.createElement("div");
  top.classList.add("line-goleiro");
  if (goleiro) top.appendChild(criarCard(goleiro));

  const middle = document.createElement("div");
  middle.classList.add("line-defesa");
  if (destaques[3]) middle.appendChild(criarCard(destaques[3]));

  const ala = document.createElement("div");
  ala.classList.add("line-ala");
  if (destaques[1]) ala.appendChild(criarCard(destaques[1]));
  if (destaques[2]) ala.appendChild(criarCard(destaques[2]));

  const bottom = document.createElement("div");
  bottom.classList.add("line-ataque");
  if (destaques[0]) bottom.appendChild(criarCard(destaques[0]));

  formation.appendChild(top);
  formation.appendChild(middle);
  formation.appendChild(ala);
  formation.appendChild(bottom);
}

function criarCard(j) {
  const card = document.createElement("div");
  card.classList.add("player-card");
  card.innerHTML = `
    <div class="overall">${j.notaUltimoJogo}</div>
    <div class="pos">${j.posicao}</div>
    <div class="name">${j.nome}</div>
  `;
  return card;
}

// --- Inicialização ---
async function init() {
  const jogadores = await carregarJogadores();
  renderJogadores(jogadores);
  renderTabela(jogadores);

  const ultimaPeladinha = await carregarUltimaPeladinha();
  montarTime(ultimaPeladinha);

  // Ordenação ao clicar no cabeçalho (agora só uma vez e usando jogadores)
  document.querySelectorAll("#statsTable th").forEach(th => {
    th.addEventListener("click", () => {
      const col = th.dataset.col;
      const ordenados = [...jogadores].sort((a, b) => {
        if (typeof a[col] === "string") {
          return a[col].localeCompare(b[col]);
        }
        return b[col] - a[col];
      });
      renderTabela(ordenados);
    });
  });
}

init();

// --- Subtabs do Cartola ---
document.querySelectorAll(".subtab").forEach(st => {
  st.addEventListener("click", () => {
    document.querySelectorAll(".subtab").forEach(s => s.classList.remove("active"));
    st.classList.add("active");
    document.querySelectorAll(".subtab-content").forEach(c => c.classList.remove("active"));
    document.getElementById(st.dataset.subtab).classList.add("active");
  });
});

// --- Troca de abas ---
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

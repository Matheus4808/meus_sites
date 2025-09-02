// Dados em JSON
const jogadores = [
    { nome: "Carlos", overall: 90, idade: 25, jogos: 50, assistencia: 10, posicao: "GOL", altura: "1.85m", gols: 0 },
    { nome: "Marcos", overall: 88, idade: 27, jogos: 70, assistencia: 5, posicao: "DEF", altura: "1.78m", gols: 2 },
    { nome: "Pedro", overall: 85, idade: 22, jogos: 40, assistencia: 2, posicao: "ZAG", altura: "1.90m", gols: 1 },
    { nome: "Lucas", overall: 87, idade: 24, jogos: 55, assistencia: 12, posicao: "MEI", altura: "1.75m", gols: 15 },
    { nome: "João", overall: 89, idade: 26, jogos: 60, assistencia: 20, posicao: "ATA", altura: "1.82m", gols: 30 },
    { nome: "André", overall: 83, idade: 23, jogos: 35, assistencia: 4, posicao: "ATA", altura: "1.80m", gols: 18 },
    { nome: "Felipe", overall: 82, idade: 28, jogos: 90, assistencia: 7, posicao: "MEI", altura: "1.77m", gols: 12 }
];

// Render lista de jogadores
const playerList = document.getElementById("playerList");
function renderJogadores(lista) {
    playerList.innerHTML = "";
    lista.forEach(j => {
        const item = document.createElement("div");
        item.classList.add("player-item");
        item.innerText = `${j.nome} (${j.posicao}) - Overall ${j.overall}`;
        item.addEventListener("click", () => abrirPopup(j));
        playerList.appendChild(item);
    });
}
renderJogadores(jogadores);

// Popup
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
function abrirPopup(j) {
    document.getElementById("popupName").innerText = j.nome;
    document.getElementById("popupOverall").innerText = j.overall;
    document.getElementById("popupPos").innerText = j.posicao;
    document.getElementById("popupIdade").innerText = j.idade;
    document.getElementById("popupJogos").innerText = j.jogos;
    document.getElementById("popupGols").innerText = j.gols;
    document.getElementById("popupAssistencia").innerText = j.assistencia;
    document.getElementById("popupAltura").innerText = j.altura;
    popup.style.display = "flex";
}
closePopup.addEventListener("click", () => popup.style.display = "none");

// Filtro
const filterInput = document.querySelector(".filter");
filterInput.addEventListener("input", e => {
    const search = e.target.value.toLowerCase();
    const filtrados = jogadores.filter(j => j.nome.toLowerCase().includes(search));
    renderJogadores(filtrados);
});

// Troca de abas
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
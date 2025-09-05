// ===== CONFIG =====
const API_BASE = "http://localhost:3000";
const SENHA = "admin123"; // simples para começar

// ===== STATE =====
let jogadores = [];
let estatisticasRodada = {}; // { nomeJogador: {gols,assistencias,titulos,nota} }
let rodadaData = "";

// ===== LOGIN =====
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
document.getElementById("btnLogin").addEventListener("click", () => {
    const pass = document.getElementById("adminPassword").value;
    if (pass === SENHA) {
        document.getElementById("loginError").style.display = "none";
        loginScreen.style.display = "none";
        adminPanel.style.display = "block";
        boot();
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// ===== TABS =====
document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// ===== API HELPERS =====
async function apiGet(path) {
    const r = await fetch(`${API_BASE}${path}`);
    if (!r.ok) throw new Error(`GET ${path} falhou`);
    return await r.json();
}
async function apiPost(path, body) {
    const r = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(`POST ${path} falhou`);
    return await r.json();
}
async function apiPut(path, body) {
    const r = await fetch(`${API_BASE}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error(`PUT ${path} falhou`);
    return await r.json();
}
async function apiDelete(path) {
    const r = await fetch(`${API_BASE}${path}`, { method: "DELETE" });
    if (!r.ok) throw new Error(`DELETE ${path} falhou`);
    return await r.json();
}


// ===== BOOT =====
async function boot() {
    try {
        jogadores = await apiGet("/jogadores");
    } catch (e) {
        console.error(e);
        jogadores = [];
    }
    renderJogadores();
    preencherSelectJogadores();
    // carrega rodada atual (se houver)
    try {
        const ultima = await apiGet("/ultimaPeladinha");
        if (ultima?.data) {
            rodadaData = ultima.data;
            document.getElementById("dataPeladinha").value = ultima.data;
            // monta estatisticasRodada em memória
            estatisticasRodada = {};
            (ultima.estatisticas || []).forEach(s => {
                estatisticasRodada[s.nome] = {
                    gols: s.gols || 0,
                    assistencias: s.assistencias || 0,
                    titulos: s.titulos || 0,
                    nota: s.nota || 0
                };
            });
            renderEstatsRodada();
        }
    } catch (e) {
        // sem arquivo ainda, tudo bem
    }
    calcularTimeSemana(); // mostra algo inicial
}

// ===== JOGADORES LISTA =====
const tbodyJog = document.getElementById("listaJogadores");
const busca = document.getElementById("buscaJogador");

function renderJogadores() {
    const termo = (busca.value || "").toLowerCase().trim();
    tbodyJog.innerHTML = "";
    jogadores
        .filter(j => !termo || j.nome.toLowerCase().includes(termo) || (j.posicao || "").toLowerCase().includes(termo))
        .forEach((j, i) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${j.nome}</td>
        <td><span class="badge">${j.posicao || "-"}</span></td>
        <td>${j.overall ?? "-"}</td>
        <td>${j.notaUltimoJogo ?? "-"}</td>
        <td>
          <button onclick="editarJogador(${i})">Editar</button>
          <button onclick="removerJogador(${i})" style="background:#dc3545;">Remover</button>
        </td>
      `;
            tbodyJog.appendChild(tr);
        });
}
busca.addEventListener("input", renderJogadores);

function preencherSelectJogadores() {
    const select = document.getElementById("jogadorSelect");
    select.innerHTML = jogadores.map((j, i) => `<option value="${i}">${j.nome} (${j.posicao || "-"})</option>`).join("");
}

// ===== FORM JOGADOR =====
const fNome = document.getElementById("fNome");
const fPosicao = document.getElementById("fPosicao");
const fOverall = document.getElementById("fOverall");
const fIdade = document.getElementById("fIdade");
const fAltura = document.getElementById("fAltura");
const fJogos = document.getElementById("fJogos");
const fNota = document.getElementById("fNota");
const fGols = document.getElementById("fGols");
const fAssist = document.getElementById("fAssist");
const fTitulos = document.getElementById("fTitulos");
const editIndex = document.getElementById("editIndex");

document.getElementById("btnSalvarJogador").addEventListener("click", async () => {
    const novo = {
        nome: fNome.value.trim(),
        posicao: fPosicao.value.trim().toUpperCase(),
        overall: toInt(fOverall.value),
        idade: toInt(fIdade.value),
        altura: fAltura.value.trim(),
        jogos: toInt(fJogos.value),
        notaUltimoJogo: toFloat(fNota.value),
        gols: toInt(fGols.value),
        assistencia: toInt(fAssist.value),
        titulos: toInt(fTitulos.value),
    };
    if (!novo.nome || !novo.posicao) {
        alert("Nome e posição são obrigatórios.");
        return;
    }

    const idx = editIndex.value ? parseInt(editIndex.value, 10) : -1;
    if (idx >= 0) {
        // Jogador já existe → PUT
        const id = jogadores[idx].id;
        await apiPut(`/jogadores/${id}`, novo);
    } else {
        // Novo jogador → POST
        await apiPost("/jogadores", novo);
    }

    jogadores = await apiGet("/jogadores");
    renderJogadores();
    preencherSelectJogadores();
    limparFormJogador();
    alert("Jogador salvo com sucesso!");
});


document.getElementById("btnLimparJogador").addEventListener("click", limparFormJogador);

function editarJogador(i) {
    const j = jogadores[i];
    fNome.value = j.nome || "";
    fPosicao.value = j.posicao || "";
    fOverall.value = j.overall ?? "";
    fIdade.value = j.idade ?? "";
    fAltura.value = j.altura || "";
    fJogos.value = j.jogos ?? "";
    fNota.value = j.notaUltimoJogo ?? "";
    fGols.value = j.gols ?? "";
    fAssist.value = j.assistencia ?? "";
    fTitulos.value = j.titulos ?? "";
    editIndex.value = String(i);

    // muda para a aba de edição automaticamente
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    document.querySelector('.tab[data-tab="abaEditarJogadores"]').classList.add("active");
    document.getElementById("abaEditarJogadores").classList.add("active");
}

async function removerJogador(i) {
    if (!confirm("Remover este jogador?")) return;
    const id = jogadores[i].id;
    await apiDelete(`/jogadores/${id}`);
    jogadores = await apiGet("/jogadores");
    renderJogadores();
    preencherSelectJogadores();
}


async function persistJogadores() {
    await apiPut("/jogadores", jogadores);
    jogadores = await apiGet("/jogadores");
    renderJogadores();
    preencherSelectJogadores();
}

function limparFormJogador() {
    [fNome, fPosicao, fOverall, fIdade, fAltura, fJogos, fNota, fGols, fAssist, fTitulos].forEach(el => el.value = "");
    editIndex.value = "";
}

// utils
function toInt(v) { const n = parseInt(v, 10); return isNaN(n) ? 0 : n; }
function toFloat(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }

// ===== ESTATÍSTICAS DA RODADA =====
const listaEst = document.getElementById("listaEstatisticas");
document.getElementById("btnAddEstatistica").addEventListener("click", () => {
    const idx = parseInt(document.getElementById("jogadorSelect").value, 10);
    if (isNaN(idx)) return;
    const j = jogadores[idx];
    const reg = {
        gols: toInt(document.getElementById("gols").value),
        assistencias: toInt(document.getElementById("assistencias").value),
        titulos: toInt(document.getElementById("titulos").value),
        nota: toFloat(document.getElementById("nota").value),
    };
    estatisticasRodada[j.nome] = reg;
    renderEstatsRodada();
});

function renderEstatsRodada() {
    listaEst.innerHTML = "";
    Object.entries(estatisticasRodada).forEach(([nome, s]) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${nome}</td>
      <td>${s.gols || 0}</td>
      <td>${s.assistencias || 0}</td>
      <td>${s.titulos || 0}</td>
      <td>${s.nota || 0}</td>
      <td><button style="background:#dc3545;" onclick="remEst('${nome}')">Remover</button></td>
    `;
        listaEst.appendChild(tr);
    });
}
window.remEst = (nome) => { delete estatisticasRodada[nome]; renderEstatsRodada(); };

document.getElementById("btnSalvarRodada").addEventListener("click", async () => {
    const data = document.getElementById("dataPeladinha").value || new Date().toISOString().slice(0, 10);
    rodadaData = data;

    // aplica stats nos jogadores (incrementa e atualiza notaUltimoJogo)
    jogadores = jogadores.map(j => {
        const s = estatisticasRodada[j.nome];
        if (!s) return j;
        return {
            ...j,
            jogos: (j.jogos || 0) + 1,
            gols: (j.gols || 0) + (s.gols || 0),
            assistencia: (j.assistencia || 0) + (s.assistencias || 0),
            titulos: (j.titulos || 0) + (s.titulos || 0),
            notaUltimoJogo: s.nota ?? j.notaUltimoJogo
        };
    });

    await persistJogadores();

    const estatArray = Object.entries(estatisticasRodada).map(([nome, s]) => ({
        nome,
        gols: s.gols || 0,
        assistencias: s.assistencias || 0,
        titulos: s.titulos || 0,
        nota: s.nota || 0
    }));

    const jogadoresNota = jogadores
        .filter(j => typeof j.notaUltimoJogo === "number")
        .sort((a, b) => (b.notaUltimoJogo || 0) - (a.notaUltimoJogo || 0));

    const melhorGoleiro = jogadoresNota.find(j => j.posicao === "GOL")?.nome || null;
    const destaquesLinha = jogadoresNota.filter(j => j.posicao !== "GOL").slice(0, 4).map(j => j.nome);

    const ultima = {
        data,
        melhorGoleiro,
        destaques: destaquesLinha,
        estatisticas: estatArray
    };

    await apiPut("/ultimaPeladinha", ultima);

    alert("Rodada salva e jogadores atualizados!");
    calcularTimeSemana();
});

// ===== TIME DA PELADINHA (1–3–1) =====
document.getElementById("btnRecalcular").addEventListener("click", calcularTimeSemana);

function calcularTimeSemana() {
    const gk = [...jogadores]
        .filter(j => j.posicao === "GOL")
        .sort((a, b) => (b.notaUltimoJogo || 0) - (a.notaUltimoJogo || 0))[0];

    const linha = [...jogadores]
        .filter(j => j.posicao !== "GOL")
        .sort((a, b) => (b.notaUltimoJogo || 0) - (a.notaUltimoJogo || 0))
        .slice(0, 4);

    renderFormacao(gk, linha);
}

function renderFormacao(goleiro, linhaTop4) {
    const lg = byId("lineGoleiro"), ld = byId("lineDefesa"),
        la = byId("lineAla"), lat = byId("lineAtaque");
    [lg, ld, la, lat].forEach(el => el.innerHTML = "");

    if (goleiro) lg.appendChild(makeCard(goleiro));

    const ordenados = linhaTop4 || [];
    if (ordenados[3]) ld.appendChild(makeCard(ordenados[3]));
    if (ordenados[1]) la.appendChild(makeCard(ordenados[1]));
    if (ordenados[2]) la.appendChild(makeCard(ordenados[2]));
    if (ordenados[0]) lat.appendChild(makeCard(ordenados[0]));
}

function makeCard(j) {
    const el = document.createElement("div");
    el.className = "player-card";
    el.innerHTML = `
    <div class="overall">${(j.notaUltimoJogo ?? "-")}</div>
    <div class="pos">${j.posicao || "-"}</div>
    <div class="name">${j.nome}</div>
  `;
    return el;
}

function byId(id) { return document.getElementById(id); }

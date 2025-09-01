const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Caminhos dos arquivos JSON
const jogadoresFile = path.join(__dirname, "../data/jogadores.json");
const ultimaPeladinhaFile = path.join(__dirname, "../data/ultimaPeladinha.json");

// 🔹 Utilitário para ler JSON
function readJSON(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

// 🔹 Utilitário para gravar JSON
function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

// ========================= ROTAS ========================= //

// Jogadores - GET
app.get("/jogadores", (req, res) => {
    const jogadores = readJSON(jogadoresFile);
    res.json(jogadores);
});

// Jogadores - PUT (atualizar todos)
app.put("/jogadores", (req, res) => {
    writeJSON(jogadoresFile, req.body);
    res.json({ msg: "Jogadores atualizados com sucesso!" });
});

// Última Peladinha - GET
app.get("/ultimaPeladinha", (req, res) => {
    const ultima = readJSON(ultimaPeladinhaFile);
    res.json(ultima);
});

// Última Peladinha - PUT
app.put("/ultimaPeladinha", (req, res) => {
    writeJSON(ultimaPeladinhaFile, req.body);
    res.json({ msg: "Última Peladinha atualizada com sucesso!" });
});

// ========================================================= //

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

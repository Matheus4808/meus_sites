const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔹 Serve os arquivos estáticos da pasta "home" via "/static"
app.use("/static", express.static(path.join(__dirname, "../home")));
app.use("/site", express.static(path.join(__dirname, "../site")));
app.use("/painel", express.static(path.join(__dirname, "../painel")));
app.use("/imagens", express.static(path.join(__dirname, "../imagens"))); // se quiser

// 🔹 Quando acessar "/", envia o home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../home/home.html"));
});

// Rotas para páginas específicas
app.get("/site", (req, res) => {
  res.sendFile(path.join(__dirname, "../site/index.html"));
});

app.get("/painel", (req, res) => {
  res.sendFile(path.join(__dirname, "../painel/painel.html"));
});

// Caminhos dos arquivos JSON
const jogadoresFile = path.join(__dirname, "../data/jogadores.json");
const ultimaPeladinhaFile = path.join(__dirname, "../data/ultimaPeladinha.json");

// Utilitário para ler JSON
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Utilitário para gravar JSON
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

// ========================= ROTAS ========================= //

app.get("/jogadores", (req, res) => {
  const jogadores = readJSON(jogadoresFile);
  res.json(jogadores);
});

app.put("/jogadores", (req, res) => {
  writeJSON(jogadoresFile, req.body);
  res.json({ msg: "Jogadores atualizados com sucesso!" });
});

app.get("/ultimaPeladinha", (req, res) => {
  const ultima = readJSON(ultimaPeladinhaFile);
  res.json(ultima);
});

app.put("/ultimaPeladinha", (req, res) => {
  writeJSON(ultimaPeladinhaFile, req.body);
  res.json({ msg: "Última Peladinha atualizada com sucesso!" });
});

// ========================================================= //

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

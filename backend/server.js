const express = require("express");
const path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config(); // para usar .env localmente

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render exige SSL
});

app.use(cors());
app.use(express.json());

// 🔹 Serve arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use("/static", express.static(path.join(__dirname, "../home")));
app.use("/site", express.static(path.join(__dirname, "../site")));
app.use("/painel", express.static(path.join(__dirname, "../painel")));
app.use("/imagens", express.static(path.join(__dirname, "../imagens")));

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

// ========================= ROTAS COM POSTGRES ========================= //

// Buscar jogadores
app.get("/jogadores", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jogadores ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar jogadores:", err);
    res.status(500).json({ error: "Erro ao buscar jogadores" });
  }
});

// Atualizar jogadores (substitui todos)
app.put("/jogadores", async (req, res) => {
  try {
    const jogadores = req.body;

    // Limpa tabela
    await pool.query("DELETE FROM jogadores");

    // Reinsere
    for (const j of jogadores) {
      await pool.query(
        "INSERT INTO jogadores (nome, posicao, numero) VALUES ($1, $2, $3)",
        [j.nome, j.posicao, j.numero]
      );
    }

    res.json({ msg: "Jogadores atualizados com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar jogadores:", err);
    res.status(500).json({ error: "Erro ao atualizar jogadores" });
  }
});

// Buscar última peladinha (último registro)
app.get("/ultimaPeladinha", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM ultima_peladinha ORDER BY id DESC LIMIT 1"
    );
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("Erro ao buscar última peladinha:", err);
    res.status(500).json({ error: "Erro ao buscar última peladinha" });
  }
});

// Atualizar última peladinha (mantém só 1 registro)
app.put("/ultimaPeladinha", async (req, res) => {
  try {
    const { data, local, descricao } = req.body;

    await pool.query("DELETE FROM ultima_peladinha");

    await pool.query(
      "INSERT INTO ultima_peladinha (data, local, descricao) VALUES ($1, $2, $3)",
      [data, local, descricao]
    );

    res.json({ msg: "Última peladinha atualizada com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar última peladinha:", err);
    res.status(500).json({ error: "Erro ao atualizar última peladinha" });
  }
});

// ========================================================= //

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

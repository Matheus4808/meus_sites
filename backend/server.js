const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conexão com MySQL (Railway ou local)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "peladinha",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(express.json());

// 🔹 Arquivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use("/site", express.static(path.join(__dirname, "../site")));
app.use("/painel", express.static(path.join(__dirname, "../painel")));
app.use("/imagens", express.static(path.join(__dirname, "../imagens")));

// 🔹 Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home/home.html"));
});

// ===================== CRUD Jogadores ===================== //
app.get("/jogadores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jogadores ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar jogadores:", err);
    res.status(500).json({ error: "Erro ao buscar jogadores" });
  }
});

app.post("/jogadores", async (req, res) => {
  try {
    const { nome, overall, idade, jogos, assistencia, posicao, altura, gols, notaUltimoJogo, titulos } = req.body;

    await pool.query(
      `INSERT INTO jogadores 
      (nome, overall, idade, jogos, assistencia, posicao, altura, gols, notaUltimoJogo, titulos) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, overall, idade, jogos, assistencia, posicao, altura, gols, notaUltimoJogo, titulos]
    );

    res.json({ msg: "Jogador adicionado com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar jogador:", err);
    res.status(500).json({ error: "Erro ao adicionar jogador" });
  }
});

app.put("/jogadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, overall, idade, jogos, assistencia, posicao, altura, gols, notaUltimoJogo, titulos } = req.body;

    await pool.query(
      `UPDATE jogadores 
      SET nome=?, overall=?, idade=?, jogos=?, assistencia=?, posicao=?, altura=?, gols=?, notaUltimoJogo=?, titulos=? 
      WHERE id=?`,
      [nome, overall, idade, jogos, assistencia, posicao, altura, gols, notaUltimoJogo, titulos, id]
    );

    res.json({ msg: "Jogador atualizado com sucesso!" });
  } catch (err) {
    console.error("Erro ao atualizar jogador:", err);
    res.status(500).json({ error: "Erro ao atualizar jogador" });
  }
});

app.delete("/jogadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM jogadores WHERE id = ?", [id]);
    res.json({ msg: "Jogador deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar jogador:", err);
    res.status(500).json({ error: "Erro ao deletar jogador" });
  }
});

// ===================== Rota Última Peladinha ===================== //
// 🔹 Aqui você pode montar lógica real. Exemplo básico:
app.get("/ultimaPeladinha", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jogadores ORDER BY RAND() LIMIT 5");

    const resposta = {
      melhorGoleiro: rows[0],
      destaques: rows.slice(1, 5),
    };

    res.json(resposta);
  } catch (err) {
    console.error("Erro ao buscar última peladinha:", err);
    res.status(500).json({ error: "Erro ao buscar última peladinha" });
  }
});

// ========================================================= //

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

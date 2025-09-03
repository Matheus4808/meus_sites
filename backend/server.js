const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Conexão com MySQL
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

// 🔹 Serve arquivos estáticos
// Public serve toda a pasta public
app.use(express.static(path.join(__dirname, "../public")));

// Opcional: atalhos para pastas específicas
app.use("/site", express.static(path.join(__dirname, "../site")));
app.use("/painel", express.static(path.join(__dirname, "../painel")));
app.use("/imagens", express.static(path.join(__dirname, "../imagens")));

// 🔹 Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home/home.html"));
});

// 🔹 CRUD jogadores (mesmo que já tinha)
app.get("/jogadores", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jogadores ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar jogadores:", err);
    res.status(500).json({ error: "Erro ao buscar jogadores" });
  }
});

// ➡️ Adicionar jogador
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

// ➡️ Editar jogador
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

// ➡️ Deletar jogador
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

// ========================================================= //

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

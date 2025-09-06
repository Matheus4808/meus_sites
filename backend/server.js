const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

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

// ===================== LOGIN ===================== //
app.post("/login", async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const [rows] = await pool.query("SELECT * FROM admin WHERE usuario = ?", [usuario]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const admin = rows[0];
    const senhaOk = await bcrypt.compare(senha, admin.senha);
    if (!senhaOk) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    // Aqui você poderia gerar token JWT (mais seguro), mas pra simplificar:
    res.json({ msg: "Login OK" });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no login" });
  }
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


// ===================== Última Peladinha ===================== //

// 🔹 Salvar rodada + atualizar jogadores
app.put("/ultimaPeladinha", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { data, melhorGoleiro, destaques, estatisticas } = req.body;

    await conn.beginTransaction();

    // salva rodada
    const [result] = await conn.query(
      "INSERT INTO peladinhas (data, melhorGoleiro, destaques) VALUES (?, ?, ?)",
      [data, melhorGoleiro, JSON.stringify(destaques)]
    );
    const peladinhaId = result.insertId;

    // salva estatísticas + atualiza jogadores
    for (const s of estatisticas) {
      // salva estatísticas da rodada
      await conn.query(
        `INSERT INTO estatisticas_peladinha 
         (peladinha_id, nome, gols, assistencias, titulos, nota)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [peladinhaId, s.nome, s.gols, s.assistencias, s.titulos, s.nota]
      );

      // atualiza tabela jogadores
      await conn.query(
        `UPDATE jogadores
         SET jogos = jogos + 1,
             gols = gols + ?,
             assistencia = assistencia + ?,
             titulos = titulos + ?,
             notaUltimoJogo = ?
         WHERE nome = ?`,
        [s.gols, s.assistencias, s.titulos, s.nota, s.nome]
      );
    }

    await conn.commit();
    res.json({ msg: "Rodada salva e jogadores atualizados com sucesso!" });
  } catch (err) {
    await conn.rollback();
    console.error("Erro ao salvar rodada:", err);
    res.status(500).json({ error: "Erro ao salvar rodada" });
  } finally {
    conn.release();
  }
});


// 🔹 Buscar última rodada
app.get("/ultimaPeladinha", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM peladinhas ORDER BY id DESC LIMIT 1");
    if (rows.length === 0) return res.json({});

    const peladinha = rows[0];
    const [estatisticas] = await pool.query(
      "SELECT * FROM estatisticas_peladinha WHERE peladinha_id = ?",
      [peladinha.id]
    );

    res.json({
      id: peladinha.id,
      data: peladinha.data,
      melhorGoleiro: peladinha.melhorGoleiro,
      destaques: JSON.parse(peladinha.destaques || "[]"),
      estatisticas,
    });
  } catch (err) {
    console.error("Erro ao buscar última peladinha:", err);
    res.status(500).json({ error: "Erro ao buscar última peladinha" });
  }
});


// ========================================================= //

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

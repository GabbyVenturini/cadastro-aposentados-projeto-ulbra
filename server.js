const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const mapaDestinatarios = {
  "Ana - Psicóloga": "gabbyventurini@rede.ulbra.br",
  "Evelyn - Assistente Social": "gabbuventurini@gmail.com",
};

const publicPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

function escapeHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailValido(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("Variáveis EMAIL_USER e EMAIL_PASS não configuradas no .env.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Falha na autenticação SMTP:", error);
  } else {
    console.log("SMTP autenticado com sucesso.");
  }
});

app.post("/enviar", async (req, res) => {
  try {
    const { nome, cpf, telefone, email, destinatario, mensagem } = req.body;

    if (!nome || !cpf || !telefone || !email || !destinatario) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Preencha todos os campos obrigatórios.",
      });
    }

    if (!emailValido(email)) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Informe um e-mail válido.",
      });
    }

    const emailDestino = mapaDestinatarios[destinatario];

    if (!emailDestino) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Destinatário inválido.",
      });
    }

    const html = `
      <h2>Novo cadastro - Educação Previdenciária</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>CPF:</strong> ${escapeHtml(cpf)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(telefone)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Destinatário escolhido:</strong> ${escapeHtml(destinatario)}</p>
      <p><strong>Observações / Mensagem:</strong></p>
      <p>${mensagem ? escapeHtml(mensagem) : "Não informado."}</p>
    `;

    await transporter.sendMail({
      from: `"Formulário IPASEM" <${EMAIL_USER}>`,
      to: emailDestino,
      replyTo: email,
      subject: "Novo cadastro - Educação Previdenciária",
      html,
    });

    return res.status(200).json({
      sucesso: true,
      mensagem: "Cadastro enviado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao processar o envio.",
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`A porta ${PORT} já está em uso.`);
  } else {
    console.error("Erro ao iniciar servidor:", error);
  }
});
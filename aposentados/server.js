const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/enviar", async (req, res) => {
  try {
    const { nome, cpf, telefone, email, destinatario, mensagem } = req.body;

    if (!nome || !cpf || !telefone || !email || !destinatario) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Preencha todos os campos obrigatórios.",
      });
    }

    const mapaDestinatarios = {
      "Ana - Psicóloga": "ana@seudominio.com.br",
      "Evelyn - Assistente Social": "evelyn@seudominio.com.br",
    };

    const emailDestino = mapaDestinatarios[destinatario];

    if (!emailDestino) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Destinatário inválido.",
      });
    }

    // CONFIGURE COM SEUS DADOS REAIS
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seuemail@gmail.com",
        pass: "sua_senha_de_app",
      },
    });

    const html = `
      <h2>Novo cadastro - Educação Previdenciária</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>CPF:</strong> ${cpf}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Destinatário escolhido:</strong> ${destinatario}</p>
      <p><strong>Observações / Mensagem:</strong></p>
      <p>${mensagem || "Não informado."}</p>
    `;

    await transporter.sendMail({
      from: `"Formulário IPASEM" <seuemail@gmail.com>`,
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
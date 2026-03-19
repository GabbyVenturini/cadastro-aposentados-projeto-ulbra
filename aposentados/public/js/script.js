const form = document.getElementById("cadastroForm");
const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");
const statusEl = document.getElementById("status");

if (cpfInput) {
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
  });
}

if (telefoneInput) {
  telefoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    e.target.value = value.trim();
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  statusEl.textContent = "";
  statusEl.className = "status";

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const destinatarioSelecionado = document.querySelector(
    'input[name="destinatario"]:checked'
  );

  if (!nome || !cpf || !telefone || !email || !destinatarioSelecionado) {
    statusEl.textContent = "Preencha todos os campos obrigatórios.";
    statusEl.classList.add("error");
    return;
  }

  try {
    const resposta = await fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        cpf,
        telefone,
        email,
        destinatario: destinatarioSelecionado.value,
        mensagem,
      }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.mensagem || "Erro ao enviar cadastro.");
    }

    statusEl.textContent = dados.mensagem;
    statusEl.classList.add("success");
    form.reset();
  } catch (error) {
    statusEl.textContent = error.message || "Erro ao processar a solicitação.";
    statusEl.classList.add("error");
  }
});
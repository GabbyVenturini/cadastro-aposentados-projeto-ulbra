# 📌 Sistema de Cadastro – Educação Previdenciária

## 📖 Descrição

Este projeto consiste em uma aplicação web desenvolvida para **coletar e encaminhar solicitações de servidores interessados em ações de Educação Previdenciária**.

O sistema permite que o usuário preencha um formulário com seus dados e selecione o profissional responsável pelo atendimento. A aplicação processa essas informações e realiza o envio automático para o destinatário correspondente.



## 🎯 Objetivo

Centralizar e padronizar o registro de interesse dos servidores, facilitando o encaminhamento das solicitações para o setor responsável.



## 🧠 Regra de Negócio

O sistema identifica o profissional selecionado pelo usuário e direciona automaticamente a solicitação para o e-mail correspondente.

### Exemplo:
- Se o usuário selecionar **Ana - Psicóloga**, o envio será feito para o e-mail da Ana.
- Se selecionar **Evelyn - Assistente Social**, o envio será direcionado para o e-mail da Evelyn.

## ⚙️ Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Node.js
- Express
- Nodemailer

## 📂 Estrutura do Projeto

aposentados/

├── public/

│ ├── index.html

│ ├── css/

│ │ └── style.css

│ └── js/

│ └── script.js

├── server.js

├── package.json

└── README.md




## 🚀 Funcionalidades

- Cadastro de dados do usuário:
  - Nome
  - CPF
  - Telefone
  - E-mail
- Seleção do profissional responsável
- Campo de observações
- Validação de campos obrigatórios
- Envio automático da solicitação
- Feedback visual de sucesso ou erro


## 🔄 Fluxo da Aplicação

1. Usuário acessa a interface web  
2. Preenche o formulário  
3. Seleciona o destinatário  
4. Clica em **Enviar cadastro**  
5. O JavaScript envia os dados para o back-end  
6. O servidor:
   - valida os dados  
   - aplica a regra de negócio  
   - envia o e-mail com Nodemailer  
7. O sistema retorna uma mensagem de sucesso ou erro  



## 🛠️ Como Executar o Projeto

### 1. Instalar dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

## 👩‍💻 Autoria

- Gabrielly Oliveira Venturini
- Patrick Costa
- Lúcio Carlos
- Pedro Henrique

Projeto desenvolvido para fins acadêmicos no curso de
Análise e Desenvolvimento de Sistemas – ULBRA

# Projeto de Conexão com Banco de Dados

Este é um projeto inicial para demonstrar uma conexão robusta e segura com um banco de dados MySQL utilizando um backend Node.js com Express e um frontend simples em HTML, CSS e JavaScript.

## 🚀 Tech Stack

-   **Backend**: Node.js, Express.js
-   **Banco de Dados**: MySQL (`mysql2` com suporte a Promises e Pool de Conexões)
-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **Gerenciamento de Ambiente**: `dotenv` para variáveis de ambiente

---

## ⚙️ Como Funciona

O projeto simula uma conversa entre o **Cliente** (navegador) e o **Servidor** (Node.js) para verificar o status da conexão com o banco de dados.

### Fluxo da Aplicação

1.  **Inicialização**: O usuário abre o arquivo `index.html` no navegador, que por sua vez carrega o `script.js`.
2.  **Ação do Usuário**: O usuário clica no botão "Testar Conexão".
3.  **Requisição (Frontend)**: O `script.js` utiliza a API `fetch` para enviar uma requisição `GET` para o endpoint `/api/test-connection` no servidor.
4.  **Processamento (Backend)**: O servidor Express (`server.js`) recebe a requisição. Ele tenta obter uma conexão do pool de conexões do MySQL.
5.  **Resposta (Backend)**:
    -   **Sucesso**: Se a conexão for bem-sucedida, o servidor responde com um status `200 OK` e uma mensagem em JSON: `{ "message": "Conexão ... estabelecida com sucesso!" }`.
    -   **Falha**: Se ocorrer um erro (ex: credenciais inválidas, banco de dados offline), o servidor responde com um status `500 Internal Server Error` e uma mensagem de erro.
6.  **Exibição (Frontend)**: O `script.js` recebe a resposta, interpreta o status e atualiza a interface, mostrando a mensagem de sucesso ou falha para o usuário.

---

## 📂 Estrutura de Arquivos

```
/00
├── .env                # Arquivo de credenciais (NÃO DEVE SER VERSIONADO)
├── index.html          # Estrutura da página web (Frontend)
├── package.json        # Dependências e scripts do projeto Node.js
├── server.js           # Servidor Express (Backend)
├── script.js           # Lógica do lado do cliente (Frontend)
└── style.css           # Estilização da página
```

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos

-   [Node.js](https://nodejs.org/) instalado
-   Um servidor MySQL em execução

### Passos

1.  **Clone o repositório** (se aplicável).

2.  **Navegue até a pasta do projeto**:
    ```bash
    cd c:\Repo2024\EsqJSConectProjeto\00
    ```

3.  **Configure as Variáveis de Ambiente**:
    -   Renomeie o arquivo `.env.example` para `.env` (se houver um) ou crie um novo arquivo `.env`.
    -   Preencha com suas credenciais do MySQL:
        ```dotenv
        DB_HOST=localhost
        DB_USER=seu_usuario
        DB_PASSWORD=sua_senha
        DB_DATABASE=seu_banco_de_dados
        ```

4.  **Instale as dependências**:
    ```bash
    npm install
    ```

5.  **Inicie o servidor**:
    ```bash
    npm start
    ```

6.  **Teste no Navegador**:
    -   Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).
    -   Clique no botão "Testar Conexão" para ver o resultado.

---

## 💡 Pontos-Chave e Boas Práticas

-   **Pool de Conexões**: Em `server.js`, `mysql.createPool()` é usado em vez de `mysql.createConnection()`. Isso melhora drasticamente a performance e a escalabilidade, reutilizando conexões em vez de abrir e fechar uma a cada requisição.
-   **Segurança**: As credenciais do banco de dados são armazenadas no arquivo `.env` e carregadas com a biblioteca `dotenv`. Este arquivo **não deve** ser enviado para repositórios públicos (deve ser incluído no `.gitignore`).
-   **Async/Await**: O código utiliza `async/await` tanto no frontend (`fetch`) quanto no backend (conexão com o banco), tornando-o mais limpo, legível e moderno em comparação com callbacks aninhados.
-   **Tratamento de Erros**: Blocos `try...catch...finally` são usados para garantir que os erros sejam capturados e que a conexão com o banco de dados seja sempre liberada (`connection.release()`) de volta para o pool, evitando vazamento de recursos.

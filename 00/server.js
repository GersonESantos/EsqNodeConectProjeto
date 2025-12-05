// Importa os módulos necessários
const express = require('express');
const mysql = require('mysql2/promise');
const dotenv =require('dotenv');
const path = require('path');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do pool de conexões com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Rota da API para testar a conexão
app.get('/api/test-connection', async (req, res) => {
    let connection;
    try {
        // Pega uma conexão do pool
        connection = await pool.getConnection();
        // Se chegou até aqui, a conexão foi bem-sucedida
        res.status(200).json({ message: 'Conexão com o banco de dados estabelecida com sucesso!' });
    } catch (error) {
        // Se ocorrer um erro, envia uma resposta de erro
        console.error('Erro ao conectar com o banco de dados:', error);
        res.status(500).json({ message: 'Falha ao conectar com o banco de dados.', error: error.message });
    } finally {
        // Libera a conexão de volta para o pool
        if (connection) {
            connection.release();
        }
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

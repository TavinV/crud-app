const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const porta = 3000;
const app = express();

// Configurar JSON Server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router); // Rota para a API JSON Server

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'teste.html'));
});

// Rota dinâmica para páginas HTML sem necessidade de extensão
app.get('/:page', (req, res, next) => {
    const pagePath = path.join(__dirname, 'public', req.params.page + '.html');

    // Verifica se o arquivo existe antes de enviar
    if (fs.existsSync(pagePath)) {
        res.sendFile(pagePath);
    } else {
        next(); // Se não existir, passa para a rota 404
    }
});

// Rota de erro 404
app.use((req, res) => {
    console.log('Página não encontrada: ' + req.url);
    res.status(404).sendFile(path.join(__dirname, 'public', 'pagenotfound.html'));
});

// Inicia o servidor na porta definida
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
    console.log(`JSON Server disponível em http://localhost:${porta}/api`);
});

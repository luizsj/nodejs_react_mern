const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');
const Produto = require('./controllers/produtos.controller');

routes.get('/', (req, res) => {
    res.json({message: "hello world"});
});

//Rotas de Usuários
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios', Usuario.index);
routes.get('/api/usuarios/:_id', Usuario.details);
routes.delete('/api/usuarios/:_id', Usuario.delete);
routes.put('/api/usuarios', Usuario.update)

//Rotas de Produtos
routes.post('/api/produtos', Produto.create);
routes.get('/api/produtos', Produto.index);
routes.get('/api/produtos/:_id', Produto.details);
routes.delete('/api/produtos/:_id', Produto.delete);
routes.put('/api/produtos', Produto.update);
routes.post('/api/usuarios/login', Usuario.login)
routes.get('/api/usuarios/checktoken', Usuario.checkToken)

module.exports = routes;
const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');

routes.get('/', (req, res) => {
    res.json({message: "hello world"});
});

//Rotas e Usuários
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuario/:_id', Usuario.details)

module.exports = routes;
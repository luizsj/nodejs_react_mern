const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller');

routes.get('/', (req, res) => {
    res.json({message: "hello world"});
});
routes.post('/api/usuarios', Usuario.create);

module.exports = routes;
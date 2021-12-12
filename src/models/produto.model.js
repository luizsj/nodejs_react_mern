const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { stringify } = require('querystring');

const DataSchema = new mongoose.Schema({
    nome_produto: String,
    descricao_produto: String,
    preco_produto: { type: Number, default: 1},
    qtd_produto: Number
},{
    timestamps: true
});

const produtos = mongoose.model('Produtos', DataSchema);
module.exports = produtos;

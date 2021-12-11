const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { stringify } = require('querystring');

const DataSchema = new mongoose.Schema({
    nome_usuario: String,
    email_usuario: String,
    tipo_usuario: { type: Number, default: 1},
    senha_usuario: String
},{
    timestamps: true
});

DataSchema.pre('save', function(next){
    if (!this.isModified('senha_usuario')){
        
    }else{
        bcrypt.genSalt(10, (erro, salt) => {
            bcrypt.hash(this.senha_usuario, salt, (erro, hash) => {
                if (erro){
                    req.flash("error_msg",  "Erro ao salvar o usuário")
                    res.redirect("/")    
                }else{
                    console.log(this.senha_usuario +'=' + hash)
                    this.senha_usuario = hash
                    return next();
                }
            })
        })
    }
});

const usuarios = mongoose.model('Usuarios', DataSchema);
module.exports = usuarios;

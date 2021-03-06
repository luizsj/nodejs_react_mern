const Usuario = require('../models/usuario.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const secret = '7k~?Yt,vqeSk';

module.exports = {
    index(req, res){
        const user = Usuario.find().then((user) => {
            res.json(user);
        }).catch((err) => {
            res.json(err)
        });
        
    },
    create(req, res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {};
        console.log(req.body);
        Usuario.findOne({email_usuario}).then((user) => {
            if (!user){
                data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario};
                Usuario.create(data).then((user) => {
                    return res.status(200).json(user);
                }).catch((err) => {
                    return res.status(500).json(err);
                });
            }else{
                console.log('email já existe!');
                return res.status(500).json(user);
            }
        }).catch((err) => {
            return res.status(500).json(err);
        });
    },
    details(req, res){
        const {_id} = req.params;
        Usuario.findOne({_id}).lean().then((user) => {
            res.json(user);
        }).catch((err) =>{
            res.json({message: 'Id não encontrado para details'});
        });
    },
    delete (req, res){
        const {_id} = req.params;
        Usuario.findById({_id}).then((user) => {
            Usuario.deleteOne({_id}).then(() => {
                res.json({message: 'Exclusão executada'});
            }).catch((err) => {
                res.json({message: 'Não foi possível excluir, erro interno!'});
            })
        }).catch((err) =>{
            res.json({message: 'Id não encontrado para delete'});
        });
    },
    update (req, res) {
        const {_id, nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body; 
        let data = {nome_usuario, email_usuario, tipo_usuario, senha_usuario} ;
            Usuario.findOneAndUpdate({_id}, data, {new:true}).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
                res.json(err);
            });
    },
    login(req, res) {
        const {email, senha} = req.body;
        console.log(senha);
        Usuario.findOne({email_usuario: email, tipo_usuario: 1}).then((user) => {
            if (!user){
                res.status(200).json({status: 2, erro: ' Email nao encontrado'})
            }else{
                user.isCorrectPassword(senha, async function (err, same){
                    if( err){
                        res.status(200).json({erro: 'Erro no Servidor!'})
                    }else if(!same){
                        res.status(200).json({status: 2, erro: 'Senha Incorreta!'});
                    }else {
                            const payload = {email};
                            const token = jwt.sign(payload, secret, {
                                expiresIn: '24h'
                            });
                            res.cookie('token', token, {httpOnly: true});
                            res.status(200).json({status: 1, auth: true, token: token, id_client: user._id, user_name: user.nome_usuario});
                    }
                })
            }
        }).catch((err) => {
            res.status(200).json({erro: ' Erro no servidor'});
        })
    },
    async checkToken(req, res) {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if (!token){
            res.json({status: 401, msg: 'Não autorizado: token inexistente!'})
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({status: 401, msg: 'Não autorizado: token inválido!'})
                }else{
                    res.json({status:200});
                }
            })
        }
    }

}
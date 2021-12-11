const Usuario = require('../models/usuario.model');

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
            res.json({message: 'Id não encontrado'});
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
            res.json({message: 'Id não encontrado'});
        });
    }
}
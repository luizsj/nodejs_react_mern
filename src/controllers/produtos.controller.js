const Produto = require('../models/produto.model');

module.exports = {
    index(req, res){
        Produto.find().then((product) => {
            if (product.length == 0){
                res.json({message: 'Cadastro de produtos vazio'});
            }else{
                res.json(product);
            }
        }).catch((err) => {
            res.json(err)
        });
        
    },
    create(req, res){
        const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;
        let data = {};
        console.log(req.body);
        Produto.findOne({nome_produto}).then((product) => {
            if (!product){
                data = {nome_produto, descricao_produto, preco_produto, qtd_produto};
                Produto.create(data).then((product) => {
                    return res.status(200).json(product);
                }).catch((err) => {
                    return res.status(500).json(err);
                });
            }else{
                console.log('Produto já existe!');
                return res.status(500).json(product);
            }
        }).catch((err) => {
            return res.status(500).json(err);
        });
    },
    details(req, res){
        const {_id} = req.params;
        Produto.findOne({_id}).lean().then((product) => {
            res.json(product);
        }).catch((err) =>{
            res.json({message: 'Id não encontrado'});
        });
    },
    delete (req, res){
        const {_id} = req.params;
        Produto.findById({_id}).then((product) => {
            Produto.deleteOne({_id}).then(() => {
                res.json({message: 'Produto excluído'});
            }).catch((err) => {
                res.json({message: 'Não foi possível excluir, erro interno!'});
            })
        }).catch((err) =>{
            res.json({message: 'Id não encontrado'});
        });
    },
    update (req, res) {
        const {_id, nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body; 
        let data = {nome_produto, descricao_produto, preco_produto, qtd_produto} ;
        Produto.findOneAndUpdate({_id}, data, {new:true}).then((product) => {
                res.json(product);
            }).catch((err) => {
                console.log(err);
                res.json(err);
            });
    }

}
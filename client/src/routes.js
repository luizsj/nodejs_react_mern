import React , {Component, Fragment} from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard/';

//IMPORTS ADMIN
import ProdutosListar from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';
import UsuariosListar from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
import Login from './pages/admin/login';

//IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutoDetails from './pages/client/produtos/produtos.details';

import Wauth from './services/wAuth';

export default class Routing extends Component {
    render(){
        return(
            <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produtos/:idProduto" element={<ProdutoDetails />} />
                    //*Rotas Admin *
                    <Route path="/admin"  element={<Dashboard />} />
                    <Route path="/admin/login"  element={<Login />} />
                    <Route path="/admin/produtos" element={<ProdutosListar />} />
                    <Route path="/admin/produtos/cadastrar" element={<ProdutoCadastrar />} />
                    <Route path="/admin/produtos/editar/:idProduto" element={<ProdutoEditar />} />
                    <Wauth path="/admin/usuarios" element={...<UsuariosListar/>}  />
                    <Route path="/admin/usuarios/cadastrar" element={<UsuarioCadastrar />} />
                    <Route path="/admin/usuarios/editar/:idUsuario" element={<UsuarioEditar />} />
                </Routes>
            </Fragment>
            </BrowserRouter>
        );
    }
}


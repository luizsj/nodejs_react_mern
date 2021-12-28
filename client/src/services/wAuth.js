import React, {useEffect, useState} from 'react';
import api from './api';
import {login, logout, getToken} from './auth';
import {Routes, Route, Navigate} from 'react-router-dom';

export default function Wauth ({ destiny, ...rest }){
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/usuarios/checkToken', {params: {token:getToken()}});
            console.log(res);
            if (res.data.status === 200){
                setLoading(false);
                setRedirect(false);
            }else{
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, []);
    console.log('1- loading = '+loading);
    console.log('1- redirect = '+redirect);
    if (loading){
       return "Carregando..."
    } else { 
        return (
            <Routes>
            <Route
                {...rest}
                render={({ location }) =>
                    (!redirect) ? (
                        destiny
                    ) : (
                        <Navigate to={{pathname: "/admin/login", state: { from: location } }} />
                    )
                }
            />
            </Routes>
        )
    }
}
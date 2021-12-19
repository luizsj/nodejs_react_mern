import * as React from 'react';
import {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuAdmin from '../../../components/admin-menu';
import Copyright from '../../../components/admin-footer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import api from '../../../services/api'
const mdTheme = createTheme();


 function UsuariosCadastrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  async  function handleSubmit(){
    const data = {nome_usuario: nome,
                email_usuario: email,
                senha_usuario:senha,
                tipo_usuario: tipo}
    if (nome !== '' && email !== '' && senha !== '' && tipo !== ''){
      const response = await api.post('/api/usuarios', data)
      if (response.status === 200) {
        window.location.href = '/admin/usuarios'
      }else{
        alert('Erro ao cadastrar o usuário')
      }
    }else{
      alert('Necessário preencher todos os dados!')
    }
    

  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        
        <MenuAdmin title={"Usuários"} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
              <Grid container spacing={1} padding={3}>
                <Grid item sm={12}>
                  <Paper  >
                    <Grid container spacing={1}  padding={3}>
                      <Grid item sm={12}>
                          <h2>Novo Usuário</h2>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          required
                          id="nome"
                          name="nome"
                          label="Nome Usuário"
                          fullWidth
                          autoComplete="nome"
                          variant="standard"
                          value= {nome}
                          onChange={ e=> setNome(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="email"
                          name="email"
                          label="Email"
                          fullWidth
                          autoComplete="email"
                          variant="standard"
                          value= {email}
                          onChange={ e=> setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <FormControl variant="standard" sx={{ m: 0, minWidth: 120, width:"100%" }}>
                          <InputLabel id="LabelTipo">Tipo</InputLabel>
                          <Select
                            labelId="LabelTipo"
                            id="tipo"
                            value= {tipo}
                            onChange={ e=> setTipo(e.target.value)}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>User</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          required
                          type="password"
                          id="senha"
                          name="senha"
                          label="Senha"
                          fullWidth
                          autoComplete="senha"
                          variant="standard"
                          value= {senha}
                          onChange={ e=> setSenha(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <UsuariosCadastrar />;
}

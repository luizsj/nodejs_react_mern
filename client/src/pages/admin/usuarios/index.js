import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Copyright from '../../../components/admin-footer';
import MenuAdmin from '../../../components/admin-menu';
import api from '../../../services/api';



const mdTheme = createTheme();

function UsuariosListar() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios(){
      const response = await api.get("/api/usuarios");
      
      setUsuarios(response.data);
    }
    loadUsuarios();
  },[]);
  console.log(usuarios);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuAdmin title={"USUÁRIOS"} />
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
                          <h2>Listagem de Usuários</h2>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Tipo</TableCell>
                                <TableCell align="center">Data Cadastro</TableCell>
                                <TableCell align="center">Opções</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {usuarios.map((row) => (
                                <TableRow
                                  key={row._id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.nome_usuario}
                                  </TableCell>
                                  <TableCell align="left">{row.email_usuario}</TableCell>
                                  <TableCell align="center">{row.tipo_usuario===1?<Chip label="Administrador" color="primary" />:<Chip label="Funcionário" color="secondary" />}</TableCell>
                                  <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                                  <TableCell align="center">
                                    <ButtonGroup aria-label="outlined small button group">
                                      <Button color="primary">Atualizar</Button>
                                      <Button color="secondary">Excluir</Button>
                                    </ButtonGroup>
                              
                                  </TableCell>
                                </TableRow>
                              ))} 
                              </TableBody> 
                          </Table>
                        </TableContainer>
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
  return <UsuariosListar />;
}

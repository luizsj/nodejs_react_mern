import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { StyledEngineProvider, ThemeProvider, createTheme  } from "@mui/material/styles";
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

ReactDOM.render(
  <StyledEngineProvider injectFirst> 
  <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>
      </StyledEngineProvider>
  ,
  document.getElementById('root')
);

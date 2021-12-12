import React, { Component } from 'react';
import Inicio from './pages/client/painel';
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<div className="App-header">
          <h2>CURSO BÁSICO NODEJS COM REACTJS</h2>
    </div>*/}
    <Inicio/>
      </div>
    );
  }
}

export default App;

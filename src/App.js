import React, { Component } from 'react';
import imagen from './cryptomonedas.png';

import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner/Spinner';

import axios from 'axios';

class App extends Component {

  state = {
    resultado: {},
    monedaSeleccionada: '',
    criptoSeleccionada: '',
    cargando: false
  }

  cotizarCriptomoneda = async (cotizacion) => {
    
    // obtener los valores
    const { moneda, criptomoneda } = cotizacion;

    //realizar consulta con axios a la api
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          resultado: respuesta.data.DISPLAY[criptomoneda][moneda],
          cargando: true
        }, () => {
            // 3 segundo despues cargando cambia a false
            setTimeout(() => {
              this.setState({ cargando: false });
            }, 3000);
        });
      });
  }

  render() {
    const resultado = (this.state.cargando) ? <Spinner /> : <Resultado 
                                                              resultado={this.state.resultado}
                                                            />;
    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen" className="logotipo"/>
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas al Instante</h1>
            <Formulario
              cotizarCriptomoneda = {this.cotizarCriptomoneda}
            />
            
            {resultado}
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;

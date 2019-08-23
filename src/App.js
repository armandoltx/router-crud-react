import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Producto from './components/Producto';

function App() {

  //state
  const [ productos, guardarProductos ] = useState([]);

  useEffect(() => {
    const consultarApi = async () => { // para consultar la api de json server
      const url = 'http://localhost:4000/restaurante';
      const resultado = await axios.get(url);

      console.log(resultado.data);
      // actualizar el state

      guardarProductos(resultado.data);
    }
    // llamar a la funcion para que se haga la consulta
    consultarApi();
  },[]);

  // Cuando quieras pasar datos al componente, tienes q usar render: con un arrow function

  return (
    <Router>
      {/* Todo lo que se coloque entre <Router> y <Switch> se va a mostrar en todas las paginas */}
      <Header />
      <div className="container mt-5">
        <Switch>
          {/* Los componentes con rutas mas especificas tienen que ir primero para q no se confundan */}
          <Route exact path="/productos"
            render={ () => (
              <Productos
                productos={productos}
              />
            ) }
          />
          <Route exact path="/nuevo-producto" component={AgregarProducto} />
          <Route exact path="/productos/:id" component={Producto} />
          <Route exact path="/productos/editar/:id" component={EditarProducto} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
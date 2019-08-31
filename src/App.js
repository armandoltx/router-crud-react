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
  const [ recargarProductos, guardarRecargarProductos ] = useState(true);

  useEffect(() => {
    if(recargarProductos) {
      const consultarApi = async () => { // para consultar la api de json server
          const url = 'http://localhost:4000/restaurante';
          const resultado = await axios.get(url);

          console.log(resultado.data);
          // actualizar el state

          guardarProductos(resultado.data);
      }
      // llamar a la funcion para que se haga la consulta
      consultarApi();

      // cambiar a false recargarProducto una vez consultados los productos
      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);

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
                guardarRecargarProductos={guardarRecargarProductos}
              />
            ) }
          />
          <Route exact path="/nuevo-producto"
            render={ () => (
              <AgregarProducto
                guardarRecargarProductos={guardarRecargarProductos}
              />
            ) }
          />

          <Route exact path="/productos/:id" component={Producto} />

          <Route exact path="/productos/editar/:id"
            render={ (props) => {
              // Tomar el Id del producto
              // console.log("props" ,props);
              console.log(props.match.params.id); //esto retorna un string hay q pasarlo a numero
              console.log(typeof props.match.params.id);
              const idProducto = parseInt(props.match.params.id);

              // tomar el producto que pasa al state
              const producto = productos.filter((producto) => { return producto.id === idProducto })


              return(
                <EditarProducto
                  producto={producto[0]}
                  guardarRecargarProductos={guardarRecargarProductos}
                />
              )
            }}
          />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
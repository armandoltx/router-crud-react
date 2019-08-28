import React, { useState } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';// higher order component para redirigir a otras paginas
// gracias a este withRouter tenemos acceso a algo conocido como history, lo usamos como destructuring y con ello podemos redirigir al usuario donde queramos;


const AgregarProducto = ({ history, guardarRecargarProductos }) => {

  //state
  const [ nombrePlatillo, guardarNombre ] = useState('');
  const [ precioPlatillo, guardarPrecio ] = useState('');
  const [ categoria, guardarCategoria ] = useState('');
  const [ error, guardarError ] = useState(false);

  const leerValorRadioCategoria = (e) => {
    guardarCategoria(e.target.value);
  }

  const agregarProducto = async (e) => {
    // prevenir el default comportamiento del formulario
    e.preventDefault();

    // VAlidar que el formulario este lleno antes de enviar
    if(nombrePlatillo === '' || precioPlatillo === '' || categoria === '') {
      guardarError(true);
      return;
    }

    // mandar los valores del formulario al componente principal y

    // ponemos error como false
    guardarError(false);

    // Crear el nuevo producto
    try {
        const url = 'http://localhost:4000/restaurante';
        const resultado = await axios.post(url, { // hay q pasarle un objeto que es el q queremos agregar.
            // nombrePlatillo : nombrePlatillo, // al ser un objeto cuya key y su value son iguales se
            // precioPlatillo : precioPlatillo, // puede ponder como lo ponemos por ES6
            // categoria : categoria,
            nombrePlatillo,
            precioPlatillo,
            categoria
        });
        // console.log(resultado);
        if(resultado.status === 201) {
            Swal.fire(
              'Producto Creado',
              'El Producto se creo correctamente',
              'success'
            )
        }


    } catch (error) {
         console.log(error);
         Swal.fire({
           type: 'error',
           title: 'Oops...',
           text: 'Algo Fue mal, vuelve a intentarlo'
         })
    }

    // Redirigimos al usuario a productos no importa si se creo o no cambiamos regargarproducto como true para que haga la consulta a la API otra vez y muestre los valores sin necesidad de recargar
    guardarRecargarProductos(true);
    history.push('/productos');

  }


  return (
    <div className="col-md-8 mx-uto">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      { (error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }


      <form
          className="mt-5"
          onSubmit={agregarProducto}
      >
          <div className="form-group">
              <label>Nombre Platillo</label>
              <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre Platillo"
                  onChange={e => guardarNombre(e.target.value)}
              />
          </div>

          <div className="form-group">
              <label>Precio Platillo</label>
              <input
                  type="number"
                  className="form-control"
                  name="precio"
                  placeholder="Precio Platillo"
                  onChange={e => guardarPrecio(e.target.value)}
              />
          </div>

          <legend className="text-center">Categoría:</legend>
          <div className="text-center">
          <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="categoria"
                  value="postre"
                  onChange={leerValorRadioCategoria}
              />
              <label className="form-check-label">
                  Postre
              </label>
          </div>
          <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="categoria"
                  value="bebida"
                  onChange={leerValorRadioCategoria}
              />
              <label className="form-check-label">
                  Bebida
              </label>
          </div>

          <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="categoria"
                  value="cortes"
                  onChange={leerValorRadioCategoria}
              />
              <label className="form-check-label">
                  Cortes
              </label>
          </div>

          <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="categoria"
                  value="ensalada"
                  onChange={leerValorRadioCategoria}
              />
              <label className="form-check-label">
                  Ensalada
              </label>
          </div>
          </div>

          <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
      </form>
    </div>
  );
};

export default withRouter(AgregarProducto);
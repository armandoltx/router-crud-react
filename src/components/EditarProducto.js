import React, { useState, useRef } from 'react';
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';// higher order component para redirigir a otras paginas
// gracias a este withRouter tenemos acceso a algo conocido como history, lo usamos como destructuring y con ello podemos redirigir al usuario donde queramos;

const EditarProducto = (props) => {

    // hacemos destructuring para q no se vea feo
    const { producto, history, guardarRecargarProductos } = props;

  console.log(producto);
//   console.log(producto.keys);
//   console.log(producto.nombrePlatillo);

  // generar los refs el ref es la forma en la que accedes directamente a un elemento del dom
  // se recomienda usar refs cuando estas editando un registro Los refs nos dan acceso a los valores
  const nombrePlatilloRef = useRef('');
  const precioPlatilloRef = useRef('');

  // para que se vean los datos, agregamos un defaultValue={producto.nombrePlatillo}, para q se rellenen los campos automaticamente para los input radio se utiliza defaultChecked

  //state
  const [ categoria, guardarCategoria ] = useState('');
  const [ error, guardarError ] = useState(false);


  const editarProducto = async (e) => {
      // prevenimos el funcionamiento del formulario
      e.preventDefault();

      // Validar el formulario

      const nuevoNombrePlatillo = nombrePlatilloRef.current.value,
            nuevoPrecioPlatillo = precioPlatilloRef.current.value;

      if(nuevoNombrePlatillo === '' || nuevoPrecioPlatillo === '' || categoria === '') {
          guardarError(true);
          return;
      }

      guardarError(false);
     
     // Obtener los valores del formulario

     // Revisar si cambio la categoria de lo contrario asignar el mismo valor,
     // puede que al darle a editar, la categoria venga vacia.
     let categoriaPlatillo = (categoria === '') ? producto.categoria : categoria
     console.log(categoriaPlatillo);

     console.log(precioPlatilloRef); // para ver de donde sacar los datos.
     const editarPlatillo = {
         precioPlatillo: nuevoPrecioPlatillo,
         nombrePlatillo : nuevoNombrePlatillo,
         categoria : categoriaPlatillo
     }
    //  console.log(editarPlatillo); 

    // Enviar el Request para actualizar el registro usamos el verbo put para editar y pasamos en la ruta (url) el id q quieres editar
    const url = `http://localhost:4000/restaurante/${producto.id}`;

    try {
        const resultado = await axios.put(url, editarPlatillo); // pasamos la url y los parametros del producto a editar

        // console.log(resultado);
        if(resultado.status === 200) {
            Swal.fire(
              'Producto Editado',
              'El Producto se edito correctamente',
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

    // Redirigir al usuario, para ello usamos => withRouter y asi podemos acceder a history en los props
    // tambien consultamos la api para refrescar.
    guardarRecargarProductos(true);
    history.push('/productos');
  }

  const leerValorRadioCategoria = (e) => {
    guardarCategoria(e.target.value);
  }


  return (
    <div className="col-md-8 mx-uto">
      <h1 className="text-center">Editar Producto</h1>

      { (error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }


      <form
          className="mt-5"
          onSubmit={editarProducto}
      >
          <div className="form-group">
              <label>Nombre Platillo</label>
              <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre Platillo"
                  ref={nombrePlatilloRef}
                  defaultValue={producto.nombrePlatillo}
              />
          </div>

          <div className="form-group">
              <label>Precio Platillo</label>
              <input
                  type="number"
                  className="form-control"
                  name="precio"
                  placeholder="Precio Platillo"
                  ref={precioPlatilloRef}
                  defaultValue={producto.precioPlatillo}
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
                  defaultChecked={(producto.categoria === 'postre')}
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
                  defaultChecked={(producto.categoria === 'bebida')}
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
                  defaultChecked={(producto.categoria === 'cortes')}
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
                  defaultChecked={(producto.categoria === 'ensalada')}
              />
              <label className="form-check-label">
                  Ensalada
              </label>
          </div>
          </div>

          <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
      </form>
    </div>
  );
};

export default withRouter(EditarProducto);
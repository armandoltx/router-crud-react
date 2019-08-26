import React, { useState } from 'react';
import Error from './Error';

const AgregarProducto = () => {

  //state
  const [ nombrePlatillo, guardarNombre ] = useState('');
  const [ precioPlatillo, guardarPrecio ] = useState('');
  const [ categoria, guardarCategoria ] = useState('');
  const [ error, guardarError ] = useState(false);

  const leerValorRadioCategoria = (e) => {
    guardarCategoria(e.target.value);
  }

  const agregarProducto = (e) => {
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

export default AgregarProducto;
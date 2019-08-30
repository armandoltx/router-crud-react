import React, { useState, useRef } from 'react';
import Error from './Error';

const EditarProducto = ({producto}) => {

  console.log(producto);
  console.log(producto.keys);
  console.log(producto.nombrePlatillo);

  // generar los refs el ref es la forma en la que accedes directamente a un elemento del dom
  // se recomienda usar refs cuando estas editando un registro Los refs nos dan acceso a los valores
  const nombrePlatilloRef = useRef('');
  const precioPlatilloRef = useRef('');

  // para que se vean los datos, agregamos un defaultValue={producto.nombrePlatillo}, para q se rellenen los campos automaticamente para los input radio se utiliza defaultChecked

  //state
  const [ categoria, guardarCategoria ] = useState('');
  const [ error, guardarError ] = useState(false);


  const editarProducto = (e) => {}

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

export default EditarProducto;
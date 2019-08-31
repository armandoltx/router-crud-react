import React from 'react';
import { Link } from 'react-router-dom'; // pq necesitamos anadir esto para los botones

import axios from 'axios';
import Swal from 'sweetalert2';

const ProductoLista = ({producto, guardarRecargarProductos}) => {

  const eliminarProducto = (id) => {
    console.log("eliminando ", id);

    Swal.fire({
      title: 'Seguro?',
      text: "Una vez eliminado el producto, no se puede recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Elimina',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if(result.value) {
        try {
          // para eliminar usamos axios
          const url = `http://localhost:4000/restaurante/${producto.id}`;
          // console.log(url);
          const resultado = await axios.delete(url);

          if(resultado.status === 200) {
            Swal.fire(
              'Eliminado!',
              'El Producto se ha eliminado',
              'success'
            )

            // volver a consultar la api
            guardarRecargarProductos(true);
          }
        } catch (error) {
            console.log(error);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Algo Fue mal, vuelve a intentarlo'
            })
        }
      }
    })
  }


  return (
    <li data-categoria={producto.categoria} className="list-group-item d-flex justify-content-between align-items-center">
      <p>
        {producto.nombrePlatillo}
        <span className="font-weight-bold"> ${producto.precioPlatillo}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >Editar</Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
          >Eliminar
        </button>
      </div>

    </li>
  );
};

export default ProductoLista;
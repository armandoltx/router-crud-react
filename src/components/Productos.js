import React, { Fragment } from 'react';
import ProductoLista from './ProductoLista';

const Productos = ({productos}) => {
  return (
    <Fragment>
      <h1 className="text-center">Productos</h1>
      <ul className="list-group mt-5">
        {console.log(productos)}
        {productos.map(producto => (
          <ProductoLista
            key={producto.id}
            producto={producto}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
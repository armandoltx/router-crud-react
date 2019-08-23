import React from 'react';
import { Link, NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/productos" className="navbar-brand">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to='/productos'
                className="nav-link"
                activeClassName="active"
              >Productos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to='/nuevo-producto'
                className="nav-link"
                activeClassName="active"
              >Nuevo Producto</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
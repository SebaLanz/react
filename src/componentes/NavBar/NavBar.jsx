import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar  expand="lg" className='navBar_contenedor'>
      <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand> {/* Utiliza Link para la página de inicio */}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Nav.Link as={Link} to="/infoCompra">Mi Carrito</Nav.Link>
            <Nav.Link as={Link} to="/misCompras">Mis Compras</Nav.Link>
          </Nav>
          <NavDropdown title="Categorías" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/productosByAll">Todas las categorías</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/electronics">Electrónicos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/jewelery">Joyería</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/men's clothing">Ropa masculina</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/women's clothing">Ropa femenina</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/Contacto">Contacto</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <CartWidget></CartWidget>
    </Navbar>
  );
};

export default NavBar;

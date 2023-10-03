import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom'; // Importa Link para crear enlaces de navegación

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className='navbar_container'>
      <Navbar.Brand href="../../App.js">Inicio</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Categorías" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/productosByAll">Todas las categorías</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/electronics">Electrónicos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/jewelery">Joyería</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/men's clothing">Ropa masculina</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/women's clothing">Ropa femenina</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <CartWidget></CartWidget>
    </Navbar>
  );
};

export default NavBar;

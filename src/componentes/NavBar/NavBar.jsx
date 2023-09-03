import React from 'react';
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de react-bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de react-bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropdown de react-bootstrap
import CartWidget from '../CartWidget/CartWidget';
const navBar = () => {
    return (
    <Navbar bg="light" expand="lg" className='navbar_container'>
    <Navbar.Brand href="../../App.js">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            {/* <Nav.Link href="../../App.js">Home</Nav.Link> */}
            <Nav.Link href="#">Mis Compras</Nav.Link>
            <Nav.Link href="#">Ofertas</Nav.Link>
            <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Opción 1</NavDropdown.Item>
                <NavDropdown.Item href="#">Opción 2</NavDropdown.Item>
                <NavDropdown.Item href="#">Opción 3</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
        <CartWidget></CartWidget>
    </Navbar>
    );
};

export default navBar;

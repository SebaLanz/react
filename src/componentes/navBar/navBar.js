import React from 'react';
import Navbar from 'react-bootstrap/Navbar'; // Importa el componente Navbar de react-bootstrap
import Nav from 'react-bootstrap/Nav'; // Importa el componente Nav de react-bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; // Importa el componente NavDropdown de react-bootstrap

const navBar = () => {
    return (
    <Navbar bg="light" expand="lg" className='navbar_container'>
    <Navbar.Brand href="../../App.js">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="../../App.js">Home</Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <NavDropdown title="Lista" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Opción 1</NavDropdown.Item>
                <NavDropdown.Item href="#">Opción 2</NavDropdown.Item>
                <NavDropdown.Item href="#">Opción 3</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
};

export default navBar;

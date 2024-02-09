import React from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function PrincipalNavbar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Hansa</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/Autor">
              Autores
            </Nav.Link>
            <Nav.Link as={Link} to="/Clientes">
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/Libros">
              Libros
            </Nav.Link>
            <Nav.Link as={Link} to="/Prestamos">
              Prestamos
            </Nav.Link>
            <NavDropdown title="Reportes" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/PrestamosVencidos">
                Prestamos vencidos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/PrestamosSemana">
                Prestamos por semana
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/PrestamosMes">
                Prestamos por mes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PrincipalNavbar;

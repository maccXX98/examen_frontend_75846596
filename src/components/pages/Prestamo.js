import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import PrestamoModal from "../modal/PrestamoModal";

export const Prestamo = () => {
  const [prestamo, setPrestamo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrestamo, setSelectedPrestamo] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const fetchPrestamos = async () => {
    const response = await axios.get(`http://localhost:8000/api/prestamos`);
    setPrestamo(response.data);
  };

  const handleDevolver = async (prestamo) => {
    try {
      await axios.post(`http://localhost:8000/api/prestamos/devolucion/${prestamo.id}`);
      fetchPrestamos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const handleShowModal = (prestamo = null) => {
    setSelectedPrestamo(prestamo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchPrestamos();
  };

  const totalPaginas = Math.ceil(prestamo.length / 15);

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col md="auto">
          <h1>Prestamos</h1>
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={() => handleShowModal()}>
            Agregar +
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título del Libro</th>
            <th>Nombre del Cliente</th>
            <th>Fecha de Préstamo</th>
            <th>Días de Préstamo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {prestamo.slice((paginaActual - 1) * 15, paginaActual * 15).map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.libro_titulo}</td>
              <td>{item.cliente_nombre}</td>
              <td>
                {new Date(item.fecha_prestamo).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{item.dias_prestamo}</td>
              <td>
                <span style={{ color: item.estado === "Devuelto" ? "cornflowerblue" : "green" }}>{item.estado}</span>
              </td>
              <td>
                <Button variant="primary" onClick={() => handleDevolver(item)}>
                  Devolucion
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PrestamoModal show={showModal} handleClose={handleCloseModal} prestamo={selectedPrestamo} />
      <Pagination>
        <Pagination.First onClick={() => setPaginaActual(1)} />
        <Pagination.Prev onClick={() => setPaginaActual((old) => Math.max(old - 1, 1))} />
        <Pagination.Item onClick={() => setPaginaActual(1)}>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        {[...Array(10)].map((_, i) => (
          <Pagination.Item key={i} onClick={() => setPaginaActual(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => setPaginaActual(totalPaginas)}>{totalPaginas}</Pagination.Item>
        <Pagination.Next onClick={() => setPaginaActual((old) => Math.min(old + 1, totalPaginas))} />
        <Pagination.Last onClick={() => setPaginaActual(totalPaginas)} />
      </Pagination>
    </Container>
  );
};

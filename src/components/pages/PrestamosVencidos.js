import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Row, Col, Pagination } from "react-bootstrap";

export const PrestamosVencidos = () => {
  const [prestamo, setPrestamo] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const fetchPrestamosVencidos = async () => {
    const response = await axios.get(`http://localhost:8000/api/prestamos/vencidos`);
    setPrestamo(response.data);
  };

  useEffect(() => {
    fetchPrestamosVencidos();
  }, []);

  const totalPaginas = Math.ceil(prestamo.length / 15);

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col md="auto">
          <h1>Préstamos vencidos</h1>
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
            </tr>
          ))}
        </tbody>
      </Table>
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

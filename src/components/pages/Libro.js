import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Pagination } from "react-bootstrap";
import LibroModal from "../modal/LibroModal";
import LibroEliminarModal from "../modal/LibroEliminarModal";

export const Libro = () => {
  const [libro, setLibro] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  const fetchLibros = async () => {
    const response = await axios.get("http://localhost:8000/api/libros");
    setLibro(response.data);
  };

  const [libroAEliminar, setLibroAEliminar] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/libros/${libroAEliminar.id}`);
      setLibroAEliminar(null);
      fetchLibros();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  const handleShowModal = (libro = null) => {
    setSelectedLibro(libro);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchLibros();
  };

  const totalPaginas = Math.ceil(libro.length / 15);

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col md="auto">
          <h1>Libros</h1>
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
            <th>Título</th>
            <th>Autor</th>
            <th>Lote</th>
            <th>Descripción</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libro.slice((paginaActual - 1) * 15, paginaActual * 15).map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.autor_nombre}</td>
              <td>{item.lote}</td>
              <td>{item.descripcion}</td>
              <td>
                {new Date(item.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  Cambiar
                </Button>
                <Button variant="danger" onClick={() => setLibroAEliminar(item)}>
                  Borrar
                </Button>
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

        {[...Array(10)].map((e, i) => (
          <Pagination.Item key={i} onClick={() => setPaginaActual(i + 20)}>
            {i + 20}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis />
        <Pagination.Item onClick={() => setPaginaActual(totalPaginas)}>{totalPaginas}</Pagination.Item>
        <Pagination.Next onClick={() => setPaginaActual((old) => Math.min(old + 1, totalPaginas))} />
        <Pagination.Last onClick={() => setPaginaActual(totalPaginas)} />
      </Pagination>
      <LibroModal show={showModal} handleClose={handleCloseModal} libro={selectedLibro} />
      {libroAEliminar && (
        <LibroEliminarModal
          show={libroAEliminar !== null}
          handleClose={() => setLibroAEliminar(null)}
          handleDelete={handleDelete}
          libro={libroAEliminar}
        />
      )}
    </Container>
  );
};

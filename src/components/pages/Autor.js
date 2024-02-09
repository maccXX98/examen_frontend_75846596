import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import AutorModal from "../modal/AutorModal";
import AutorEliminarModal from "../modal/AutorEliminarModal";

export const Autor = () => {
  const [autor, setAutor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAutor, setSelectedAutor] = useState(null);

  const fetchAutores = async () => {
    const response = await axios.get("http://localhost:8000/api/autores");
    setAutor(response.data);
  };

  const [autorAEliminar, setAutorAEliminar] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/autores/${autorAEliminar.id}`);
      setAutorAEliminar(null);
      fetchAutores();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const handleShowModal = (autor = null) => {
    setSelectedAutor(autor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchAutores();
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col md="auto">
          <h1>Autores</h1>
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
            <th>Nombre</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autor.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>
                {new Date(item.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>{" "}
              <td>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  Cambiar
                </Button>
                <Button variant="danger" onClick={() => setAutorAEliminar(item)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AutorModal show={showModal} handleClose={handleCloseModal} autor={selectedAutor} />
      {autorAEliminar && (
        <AutorEliminarModal
          show={autorAEliminar !== null}
          handleClose={() => setAutorAEliminar(null)}
          handleDelete={handleDelete}
          autor={autorAEliminar}
        />
      )}
    </Container>
  );
};

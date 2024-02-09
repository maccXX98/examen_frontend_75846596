import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import ClienteModal from "../modal/ClienteModal";
import ClienteEliminarModal from "../modal/ClienteEliminarModal";

export const Cliente = () => {
  const [cliente, setCliente] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const fetchClientes = async () => {
    const response = await axios.get("http://localhost:8000/api/clientes");
    setCliente(response.data);
  };

  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/clientes/${clienteAEliminar.id}`);
      setClienteAEliminar(null);
      fetchClientes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleShowModal = (cliente = null) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchClientes();
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col md="auto">
          <h1>Clientes</h1>
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
            <th>Email</th>
            <th>Celular</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cliente.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.email}</td>
              <td>{item.celular}</td>
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
                <Button variant="danger" onClick={() => setClienteAEliminar(item)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ClienteModal show={showModal} handleClose={handleCloseModal} cliente={selectedCliente} />
      {clienteAEliminar && (
        <ClienteEliminarModal
          show={clienteAEliminar !== null}
          handleClose={() => setClienteAEliminar(null)}
          handleDelete={handleDelete}
          cliente={clienteAEliminar}
        />
      )}
    </Container>
  );
};

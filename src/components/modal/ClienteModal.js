import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const ClienteModal = ({ show, handleClose, cliente }) => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");

  useEffect(() => {
    if (cliente) {
      setNombreCliente(cliente.nombre || "");
      setEmailCliente(cliente.email || "");
      setTelefonoCliente(cliente.celular || "");
    } else {
      setNombreCliente("");
      setEmailCliente("");
      setTelefonoCliente("");
    }
  }, [cliente]);

  const handleNombreClienteChange = (event) => {
    const re = /^[a-zA-Z\s]*$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setNombreCliente(event.target.value);
    }
  };

  const handleEmailClienteChange = (event) => {
    setEmailCliente(event.target.value);
  };

  const handleTelefonoClienteChange = (event) => {
    const re = /^7[0-9]{0,7}$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setTelefonoCliente(event.target.value);
    }
  };

  const guardarCliente = async () => {
    try {
      if (cliente) {
        // Actualizar el cliente existente
        const response = await axios.put(`http://localhost:8000/api/clientes/${cliente.id}`, {
          nombre: nombreCliente,
          email: emailCliente,
          celular: telefonoCliente,
        });
        console.log(response.data);
      } else {
        // Crear un nuevo cliente
        const response = await axios.post("http://localhost:8000/api/clientes", {
          nombre: nombreCliente,
          email: emailCliente,
          celular: telefonoCliente,
        });
        console.log(response.data);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar un cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nombreCliente">
              <Form.Label>Nombre del cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del cliente"
                value={nombreCliente}
                onChange={handleNombreClienteChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="emailCliente">
              <Form.Label>Email del cliente</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el email del cliente"
                value={emailCliente}
                onChange={handleEmailClienteChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefonoCliente">
              <Form.Label>Teléfono del cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el teléfono del cliente"
                value={telefonoCliente}
                onChange={handleTelefonoClienteChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarCliente}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClienteModal;

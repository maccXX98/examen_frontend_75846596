import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const AutorModal = ({ show, handleClose, autor }) => {
  const [nombreAutor, setNombreAutor] = useState("");

  useEffect(() => {
    setNombreAutor(autor ? autor.nombre : "");
  }, [autor]);

  const handleNombreAutorChange = (event) => {
    const re = /^[a-zA-Z\s]*$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setNombreAutor(event.target.value);
    }
  };

  const guardarAutor = async () => {
    try {
      if (autor) {
        // Actualizar el autor existente
        const response = await axios.put(`http://localhost:8000/api/autores/${autor.id}`, {
          nombre: nombreAutor,
        });
        console.log(response.data);
      } else {
        // Crear un nuevo autor
        const response = await axios.post("http://localhost:8000/api/autores", {
          nombre: nombreAutor,
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
          <Modal.Title>Agregar un autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nombreAutor">
              <Form.Label>Nombre del autor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del autor"
                value={nombreAutor}
                onChange={handleNombreAutorChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarAutor}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AutorModal;

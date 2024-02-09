import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const LibroModal = ({ show, handleClose, libro }) => {
  const [tituloLibro, setTituloLibro] = useState("");
  const [autorLibro, setAutorLibro] = useState("");
  const [loteLibro, setLoteLibro] = useState("");
  const [descripcionLibro, setDescripcionLibro] = useState("");
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    if (libro) {
      setTituloLibro(libro.titulo || "");
      setAutorLibro(libro.autor_id || "");
      setLoteLibro(libro.lote || "");
      setDescripcionLibro(libro.descripcion || "");
    } else {
      setTituloLibro("");
      setAutorLibro("");
      setLoteLibro("");
      setDescripcionLibro("");
    }
    fetchAutores();
  }, [libro]);

  const fetchAutores = async () => {
    const response = await axios.get("http://localhost:8000/api/autores");
    setAutores(response.data);
  };

  const handleLoteLibroChange = (event) => {
    const re = /^[0-9]{0,4}$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setLoteLibro(event.target.value);
    }
  };

  const guardarLibro = async () => {
    try {
      if (libro) {
        // Actualizar el libro existente
        await axios.put(`http://localhost:8000/api/libros/${libro.id}`, {
          titulo: tituloLibro,
          autor_id: autorLibro,
          lote: loteLibro,
          descripcion: descripcionLibro,
        });
      } else {
        // Crear un nuevo libro
        await axios.post("http://localhost:8000/api/libros", {
          titulo: tituloLibro,
          autor_id: autorLibro,
          lote: loteLibro,
          descripcion: descripcionLibro,
        });
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
          <Modal.Title>Agregar un libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="tituloLibro">
              <Form.Label>Título del libro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el título del libro"
                value={tituloLibro}
                onChange={(e) => setTituloLibro(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="autorLibro">
              <Form.Label>Autor del libro</Form.Label>
              <Form.Control as="select" value={autorLibro} onChange={(e) => setAutorLibro(e.target.value)}>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loteLibro">
              <Form.Label>Lote del libro</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el lote del libro"
                value={loteLibro}
                onChange={handleLoteLibroChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descripcionLibro">
              <Form.Label>Descripción del libro</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Ingrese la descripción del libro"
                value={descripcionLibro}
                onChange={(e) => setDescripcionLibro(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarLibro}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LibroModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PrestamoModal = ({ show, handleClose, prestamo }) => {
  const [libroId, setLibroId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState(new Date());
  const [diasPrestamo, setDiasPrestamo] = useState("");
  const [libros, setLibros] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    if (prestamo) {
      setLibroId(prestamo.libro_id || "");
      setClienteId(prestamo.cliente_id || "");
      setFechaPrestamo(new Date(prestamo.fecha_prestamo) || new Date());
      setDiasPrestamo(prestamo.dias_prestamo || "");
    } else {
      setLibroId("");
      setClienteId("");
      setFechaPrestamo(new Date());
      setDiasPrestamo("");
    }
    fetchLibros();
    fetchClientes();
  }, [prestamo]);

  const fetchLibros = async () => {
    const response = await axios.get("http://localhost:8000/api/libros");
    setLibros(response.data);
  };

  const fetchClientes = async () => {
    const response = await axios.get("http://localhost:8000/api/clientes");
    setClientes(response.data);
  };

  const handleDiasPrestamoChange = (event) => {
    const re = /^[0-9]{0,3}$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setDiasPrestamo(event.target.value);
    }
  };

  const guardarPrestamo = async () => {
    try {
      if (prestamo) {
        // Actualizar el préstamo existente
        await axios.put(`http://localhost:8000/api/prestamos/${prestamo.id}`, {
          libro_id: libroId,
          cliente_id: clienteId,
          fecha_prestamo: fechaPrestamo.toISOString().split("T")[0],
          dias_prestamo: diasPrestamo,
          estado: "En Préstamo",
        });
      } else {
        // Crear un nuevo préstamo
        await axios.post("http://localhost:8000/api/prestamos/registrar", {
          libro_id: libroId,
          cliente_id: clienteId,
          fecha_prestamo: fechaPrestamo.toISOString().split("T")[0],
          dias_prestamo: diasPrestamo,
          estado: "En Préstamo",
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
          <Modal.Title>Agregar un préstamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="libroId">
              <Form.Label>Libro</Form.Label>
              <Form.Control as="select" value={libroId} onChange={(e) => setLibroId(e.target.value)}>
                {libros.map((libro) => (
                  <option key={libro.id} value={libro.id}>
                    {libro.titulo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="clienteId">
              <Form.Label>Cliente</Form.Label>
              <Form.Control as="select" value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fechaPrestamo">
              <Form.Label>Fecha de Préstamo</Form.Label>
              <DatePicker selected={fechaPrestamo} onChange={(date) => setFechaPrestamo(date)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="diasPrestamo">
              <Form.Label>Días de Préstamo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese los días de préstamo"
                value={diasPrestamo}
                onChange={handleDiasPrestamoChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={guardarPrestamo}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrestamoModal;

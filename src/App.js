import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrincipalNavbar from "./components/navegation/Navbar";
import { Autor } from "./components/pages/Autor";
import { Libro } from "./components/pages/Libro";
import { Cliente } from "./components/pages/Cliente";
import { Prestamo } from "./components/pages/Prestamo";
import { PrestamosVencidos } from "./components/pages/PrestamosVencidos";
import PrestamosSemana from "./components/pages/PrestamosSemana";
import PrestamosMes from "./components/pages/PrestamosMes";

function App() {
  return (
    <div className="App">
      <Router>
        <PrincipalNavbar />
        <Routes>
          <Route path="/Autor" element={<Autor />} />
          <Route path="/Libros" element={<Libro />} />
          <Route path="/Clientes" element={<Cliente />} />
          <Route path="/Prestamos" element={<Prestamo />} />
          <Route path="/PrestamosVencidos" element={<PrestamosVencidos />} />
          <Route path="/PrestamosSemana" element={<PrestamosSemana />} />
          <Route path="/PrestamosMes" element={<PrestamosMes />} />
          <Route path="*" element={<Navigate to="/Autor" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

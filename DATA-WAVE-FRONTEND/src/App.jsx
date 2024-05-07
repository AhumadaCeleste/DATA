import { Routes, Route } from "react-router-dom";
import "./App.css";

import Inicio from "./COMPONENTS/Inicio";
import Footer from "./COMPONENTS/Footer";
import CrearInstituto from "./COMPONENTS/CrearInstituto";
import InstList from "./COMPONENTS/InstList";
import Departamento from "./COMPONENTS/Departamento";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/instituto/lista" element={<InstList/>} />
        <Route path="/instituto/nuevo" element={<CrearInstituto/>} />
        <Route path="/instituto/editar/:id" element={<CrearInstituto/>} />
        <Route path="/departamento/nuevo" element={<Departamento/>} />
        <Route path="/departamento/lista" element={<Departamento/>} />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Routes, Route,} from 'react-router-dom';
import './App.css';
import Inicio from './COMPONENTS/Inicio';
import Footer from './COMPONENTS/Footer';

import CrearInstituto from './COMPONENTS/CrearInstituto';
import BMInstituto from './COMPONENTS/BMInstituto';

import AltaOferta from './COMPONENTS/AltaOferta';
import BMOferta from './COMPONENTS/BMOferta';

import Adepartamento from './COMPONENTS/Adepartamento';
import Inspector from './COMPONENTS/Inspector';
import Director from './COMPONENTS/Director';
import InstList from './COMPONENTS/InstList';
import ConsultaMatricula from './COMPONENTS/ConsultaMatricula';
import ConsultaEgresados from './COMPONENTS/ConsultaEgresados';

import Secretario from './COMPONENTS/Secretario';
import OfertaMatricula from './COMPONENTS/OfertaMatricula'; // Secretario


function App() {
  return (
    <div style={{ marginBottom: '50px' }}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/instituto/nuevo" element={<CrearInstituto />} />
        <Route path="/instituto/editar" element={<BMInstituto />} />
        <Route path="/departamento/nuevo" element={<Adepartamento />} />
        <Route path="/departamento/actualizar" element={<Adepartamento />} />
        <Route path="/secretario" element={<Secretario />} />
        <Route path="/cargar-matricula" element={<OfertaMatricula />} />
        <Route path="/director" element={<Director />} />
        <Route path="/consulta-matricula" element={<ConsultaMatricula />} />
        <Route path="/consulta-egresados" element={<ConsultaEgresados />} />
        <Route path="/instituto-lista" element={<InstList />} />

        <Route path="/inspector" element={<Inspector />}>
          <Route path="crear-instituto" element={<CrearInstituto />} />
          <Route path="editar-instituto" element={<BMInstituto />} />
          <Route path="crear-oferta" element={<AltaOferta />} />
          <Route path="gestionar-oferta" element={<BMOferta />} />
          <Route path="consulta-matricula" element={<ConsultaMatricula />} />
          <Route path="consulta-egresados" element={<ConsultaEgresados />} />
          <Route path="instituto-lista" element={<InstList />} />
        </Route>

        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
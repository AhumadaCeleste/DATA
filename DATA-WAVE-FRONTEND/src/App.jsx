import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Inicio from './COMPONENTS/Inicio';
import Footer from './COMPONENTS/Footer';
import Home from './COMPONENTS/Home';
import CrearInstituto from './COMPONENTS/CrearInstituto';
import BMInstituto from './COMPONENTS/BMInstituto';
import InstList from './COMPONENTS/InstList';
import Adepartamento from './COMPONENTS/Adepartamento';
import Inspector from './COMPONENTS/Inspector';
import Director from './COMPONENTS/Director';
import Secretario from './COMPONENTS/Secretario';
import OfertaMatricula from './COMPONENTS/OfertaMatricula';
import { loginUser } from './SERVICE/Usuariologin.service';

//import { AuthProvider } from './CONTEXT/RolContext';

function App() {
 
  return (
      <div style={{ marginBottom: '50px' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/instituto/lista" element={<InstList />} />
          <Route path="/instituto/nuevo" element={<CrearInstituto />} />
          <Route path="/instituto/editar" element={<BMInstituto />} />
          <Route path="/departamento/nuevo" element={<Adepartamento />} />
          <Route path="/departamento/actualizar" element={<Adepartamento />} />
          <Route path="/secretario" element={<Secretario />} />
            <Route path="/cargar-matricula" element={<OfertaMatricula />} />
          <Route path="/director" element={<Director />} />
          <Route path="/inspector" element={<Inspector />}>
            <Route path="crear-instituto" element={<CrearInstituto />} />
            <Route path="editar-instituto" element={<BMInstituto />} />
          </Route>
          // Corrige esta línea
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;




{/*
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Inicio from './COMPONENTS/Inicio';
import Footer from './COMPONENTS/Footer';
import Home from './COMPONENTS/Home';
import CrearInstituto from './COMPONENTS/CrearInstituto';
import BMInstituto from './COMPONENTS/BMInstituto';
import InstList from './COMPONENTS/InstList';
import Adepartamento from './COMPONENTS/Adepartamento';
//import BMDepartamento from './COMPONENTS/BMDepartamento';
import Inspector from './COMPONENTS/Inspector';
import {loginUser} from './SERVICE/Usuariologin.service';
import { AuthProvider } from './SERVICE/Usuariologin.service';

function App() {
  //logica de login
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //const [SiglaRol, setSiglaRol] = useState(0);


  const login = async () => {
    const res = await loginUser(dni, password);
    console.log(`resultado: `, res);
    console.log("Desde App")
    if (res.resultado) {
            console.log(res.data);
            if (res.idrol === 1) {
                console.log("pagina inspector")
                navigate("/inspector");
            } else if (res.idrol === 2) {
                navigate("/director");
            } else if (res.idrol === 3) {
                navigate("/secretario");
            } 
        } else {
            alert("DNI o contraseña de usuario incorrecta");
        }
  
  };

  const logout = () => {
    //localStorage.removeItem("nombre");
    localStorage.clear();
    navigate("/"); 
  };



  //sigo
  return (
    <div style={{ marginBottom: '50px' }}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/instituto/lista" element={<InstList />} />
        <Route path="/instituto/nuevo" element={<CrearInstituto />} />
        <Route path="/instituto/editar" element={<BMInstituto />} />
        <Route path="/departamento/nuevo" element={<Adepartamento />} />
        <Route path="/departamento/actualizar" element={<Adepartamento />} />
        <Route path="/secretario" element={<Inspector />}></Route>
        <Route path="/inspector" element={<Inspector />}>
          <Route path="crear-instituto" element={<CrearInstituto />} />
          <Route path="editar-instituto" element={<BMInstituto />} />
        </Route>
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;*/}
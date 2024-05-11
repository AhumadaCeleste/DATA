import {Routes, Route} from "react-router-dom";
import "./App.css";

import Inicio from "./COMPONENTS/Inicio";
import Footer from "./COMPONENTS/Footer";
import Home from "./COMPONENTS/Home";
import CrearInstituto from "./COMPONENTS/CrearInstituto";
import InstList from "./COMPONENTS/InstList";
import Adepartamento from "./COMPONENTS/Adepartamento";
import BMDepartamento from "./COMPONENTS/BMDepartamento";
import BMInstituto from "./COMPONENTS/BMDepartamento";

// ordenar el codico con beauty: seleccionar el codigo Ctrl+Shift+P y hacer clic
// en beauty

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Inicio />}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/instituto/lista" element={<InstList/>}/>
                <Route path="/instituto/nuevo" element={<CrearInstituto/>}/>
                <Route path="/instituto/actualizar" element={<BMInstituto/>}/>
                <Route path="/departamento/nuevo" element={<Adepartamento/>}/>
                <Route path="/departamento/actualizar" element={<BMDepartamento/>}/>
                <Route path="*" element={<div> 404 - Página no encontrada</div>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
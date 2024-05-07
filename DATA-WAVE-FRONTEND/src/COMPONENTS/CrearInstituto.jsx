import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CrearInstitutoFull() {
  // Define estados para los campos del formulario
  const [cue, setCue] = useState("");
  const [ee, setEe] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [cuesede, setCuesede] = useState("");
  const [tipoinstitutoId, setTipoinstitutoId] = useState("");
  const [CiudadId, setCiudadId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  // objetos de combos
  const [ciudades, setCiudades] = useState([]);
  const [tipoinstituto, setTipoinstituto] = useState([]);
  const [sucursal, setSucursal] = useState([]);


  useEffect(() => {

    axios.get("http://localhost:3001/ciudad/lista")
      .then(response => {
        setCiudades(response.data);
      })
      .catch(error => {
        console.error("Error al obtener ciudades:", error);
      });

      axios.get("http://localhost:3001/tipoinstituto/lista")
      .then(response => {
        setTipoinstituto(response.data);
      })
      .catch(error => {
        console.error("Error al obtener tipo instituto:", error);
      });

      axios.get("http://localhost:3001/sucursal/lista")
      .then(response => {
        setSucursal(response.data);
      })
      .catch(error => {
        console.error("Error al obtener la sucursal:", error);
      });

  }, []);

  
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del mensaje
    const nuevoinstitutofull = {
      cue,
      ee,
      denominacion,
      cuesede,
      tipoinstitutoId,
      CiudadId,
      sucursalId,
    };
    try {
      // Realiza una petición POST al backend para guardar el mensaje
      const res = await axios.post("http://localhost:3001/instituto/nuevo", nuevoinstitutofull);
      console.log(res);
      alert("Instituto Agregado");

    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      // Maneja cualquier error que ocurra durante la solicitud
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  return (
    <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
      <div className="contactar-container">
        <h2 className="titulo_pricipal_paginas mb-4 mt-0 shadow-lg text-center">Crear Instituto</h2>
        <form onSubmit={handleSubmit}>
          
          {/* CAMPO 1 INI*/}
          <div className="mb-4">
            <label htmlFor="cue" className="block mb-2">Cue:</label>
            <input
              type="text"
              id="cue"
              name="cue"
              value={cue}
              onChange={(e) => setCue(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          {/* CAMPO 1 FIN*/}

          {/* CAMPO 2 INI*/}
          <div className="mb-4">
            <label htmlFor="ee" className="block mb-2">Ee:</label>
            <input
              type="text"
              id="ee"
              name="ee"
              value={ee}
              onChange={(e) => setEe(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          {/* CAMPO 2 FIN*/}

          {/* CAMPO 3 INI*/}
          <div className="mb-4">
            <label htmlFor="denominacion" className="block mb-2">Denominacion:</label>
            <input
              type="text"
              id="denominacion"
              name="denominacion"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          {/* CAMPO 3 FIN*/}

          {/* CAMPO 4 INI*/}
          <div className="mb-4">
            <label htmlFor="cuesede" className="block mb-2">Cuesede:</label>
            <input
              type="text"
              id="cuesede"
              name="cuesede"
              value={cuesede}
              onChange={(e) => setCuesede(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          {/* CAMPO 4 FIN*/}

          {/* CAMPO 5 INI*/}
          <div className="mb-4">
            <label htmlFor="tipoinstitutoId" className="block mb-2">Tipoinstituto</label>
            <select
              type="number"
              id="tipoinstitutoId"
              name="tipoinstitutoId"
              value={tipoinstitutoId}
              onChange={(e) => setTipoinstitutoId(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            >
              <option value="">Seleccionar Tipo Instituto</option>
              {tipoinstituto.map(tipoinstituto => (
                <option key={tipoinstituto.id} value={tipoinstituto.id}>{tipoinstituto.descripcion}</option>
              ))}
            </select>
          </div>
          {/* CAMPO 5 FIN*/}

          {/* CAMPO 6 INI*/}
          <div className="mb-4">
            <label htmlFor="CiudadId" className="block mb-2">Ciudad</label>
            <select
              type="number"
              id="CiudadId"
              name="CiudadId"
              value={CiudadId}
              onChange={(e) => setCiudadId(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            >
              <option value="">Seleccionar ciudad</option>
              {ciudades.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
          </div>
          {/* CAMPO 6 FIN*/}

          {/* CAMPO 7 INI*/}
          <div className="mb-4">
            <label htmlFor="sucursalId" className="block mb-2">Sucursal</label>
            <select
              type="number"
              id="sucursalId"
              name="sucursalId"
              value={sucursalId}
              onChange={(e) => setSucursalId(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            >
              <option value="">Seleccionar la sucursal</option>
              {sucursal.map(sucursal => (
                <option key={sucursal.id} value={sucursal.id}>{sucursal.descripcion}</option>
              ))}
            </select>
          </div>
          {/* CAMPO 7 FIN*/}

          <button type="submit" className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            AGREGAR
          </button>
         
         {/* 
        <Link to={`/ModCategoria`}>   
        <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
         GESTIONAR CATEGORIAS
        </button>
          </Link>
        */}

        <Link to={`/logout`}>   
        <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
         CERRAR SESION
        </button>
          </Link>
        </form>

    
    
      </div>
    </div>
  );
}

export default CrearInstitutoFull;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CrearInstitutoFull() {
  const [cue, setCue] = useState("");
  const [ee, setEe] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [cuesede, setCuesede] = useState("");
  const [tipoinstitutoId, setTipoinstitutoId] = useState("");
  const [CiudadId, setCiudadId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const res = await axios.post("http://localhost:3001/instituto/nuevo", nuevoinstitutofull);
      console.log(res);
      alert("Instituto Agregado");
    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  return (
    <div class="flex flex-col justify-between h-screen my-4 sm:my-0">
    <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-[50vw] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold mb-4 text-sky-800">Crear Instituto</h2>
      <form onSubmit={handleSubmit} className="space-y-6 font-bold">
        <label htmlFor="cue" className="block">
          Cue:
          <input
            type="text"
            id="cue"
            name="cue"
            value={cue}
            onChange={(e) => setCue(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          />
        </label>

        <label htmlFor="ee" className="block text-sky-800">
          Ee:
          <input
            type="text"
            id="ee"
            name="ee"
            value={ee}
            onChange={(e) => setEe(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          />
        </label>

        <label htmlFor="denominacion" className="block">
          Denominacion:
          <input
            type="text"
            id="denominacion"
            name="denominacion"
            value={denominacion}
            onChange={(e) => setDenominacion(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          />
        </label>

        <label htmlFor="cuesede" className="block text-sky-800">
          Cuesede:
          <input
            type="text"
            id="cuesede"
            name="cuesede"
            value={cuesede}
            onChange={(e) => setCuesede(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          />
        </label>

        <label htmlFor="tipoinstitutoId" className="block">
          Tipo de Instituto:
          <select
            id="tipoinstitutoId"
            name="tipoinstitutoId"
            value={tipoinstitutoId}
            onChange={(e) => setTipoinstitutoId(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          >
            <option value="">Seleccionar Tipo Instituto</option>
            {tipoinstituto.map(tipoinstituto => (
              <option key={tipoinstituto.id} value={tipoinstituto.id}>{tipoinstituto.descripcion}</option>
            ))}
          </select>
        </label>

        <label htmlFor="CiudadId" className="block">
          Ciudad:
          <select
            id="CiudadId"
            name="CiudadId"
            value={CiudadId}
            onChange={(e) => setCiudadId(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          >
            <option value="">Seleccionar ciudad</option>
            {ciudades.map(ciudad => (
              <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
            ))}
          </select>
        </label>

        <label htmlFor="sucursalId" className="block">
          Sucursal:
          <select
            id="sucursalId"
            name="sucursalId"
            value={sucursalId}
            onChange={(e) => setSucursalId(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
          >
            <option value="">Seleccionar la sucursal</option>
            {sucursal.map(sucursal => (
              <option key={sucursal.id} value={sucursal.id}>{sucursal.descripcion}</option>
            ))}
          </select>
        </label>
        
        <button type="submit" className="px-4 py-2 text-sm bg-sky-600 text-white font-bold rounded hover:bg-gray-700">
          AGREGAR
        </button>
      </form>
 
      </div>   
      </div>
      
  );
}

export default CrearInstitutoFull;
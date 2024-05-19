import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom

function OfertaMatricula() {
  const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState("");
  const [cue, setCue] = useState("");
  const [ee, setEe] = useState("");
  const [cuesede, setCuesede] = useState("");
  const [tipoinstitutoId, setTipoinstitutoId] = useState("");
  const [CiudadId, setCiudadId] = useState("");
  const [sucursalId, setSucursalId] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [tipoinstituto, setTipoinstituto] = useState([]);
  const [sucursal, setSucursal] = useState([]);
  const [oferta, setOferta] = useState([]);
  const [filteredOferta, setFilteredOferta] = useState([]);
  const [cohorte, setCohorte] = useState([]);

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

    axios.get("http://localhost:3001/cohorte/lista")
      .then(response => {
        setCohorte(response.data);
      })
      .catch(error => {
        console.error("Error al obtener cohorte:", error);
      });

    axios.get("http://localhost:3001/instituto/lista")
      .then(response => {
        setInstitutos(response.data);
      })
      .catch(error => {
        console.error("Error al obtener institutos:", error);
      });

    axios.get("http://localhost:3001/oferta/lista")
      .then(response => {
        setOferta(response.data);
      })
      .catch(error => {
        console.error("Error al obtener oferta:", error);
      });

    axios.get("http://localhost:3001/sucursal/lista")
      .then(response => {
        setSucursal(response.data);
      })
      .catch(error => {
        console.error("Error al obtener la sucursal:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedInstituto) {
      const ofertasFiltradas = oferta.filter(o => o.institutoId === parseInt(selectedInstituto));
      setFilteredOferta(ofertasFiltradas);
    } else {
      setFilteredOferta([]);
    }
  }, [selectedInstituto, oferta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CargaMatricula = {
      cue,
      ee,
      denominacion: selectedInstituto,
      cuesede,
      tipoinstitutoId,
      CiudadId,
      sucursalId,
      oferta,
      cohorte,
    };
    try {
      const res = await axios.post("http://localhost:3001/instituto/nuevo", CargaMatricula);
      console.log(res);
      alert("Instituto Agregado");
      navigate('/secretario'); // Redirige a otra ruta después de agregar el instituto
    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  const cancelCerrar = () => {
    navigate("/inspector"); // Función para redirigir a la ruta "/inspector"
  };

  return (
    <div className="flex flex-col justify-between h-screen my-4 sm:my-0">
      <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-[50vw] max-w-screen-lg mx-auto">
        <h2 className="text-lg font-bold mb-4 text-sky-800">Cargar Instituto</h2>
        <form onSubmit={handleSubmit} className="space-y-6 font-bold">
          <label htmlFor="denominacion" className="block">
            Seleccione el Instituto a cargar Matricula:
            <select
              id="denominacion"
              name="denominacion"
              value={selectedInstituto}
              onChange={(e) => setSelectedInstituto(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
            >
              <option value="">Seleccionar Instituto</option>
              {institutos.map(instituto => (
                <option key={instituto.id} value={instituto.id}>{instituto.denominacion}</option>
              ))}
            </select>
          </label>

          <label htmlFor="cue" className="block">
            Cue:
            <select
              id="cue"
              name="cue"
              value={cue}
              onChange={(e) => setCue(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
            >
              <option value="">Seleccionar Oferta</option>
              {filteredOferta.map(o => (
                <option key={o.id} value={o.id}>{o.descripcion}</option>
              ))}
            </select>
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

          <label htmlFor="oferta" className="block">
            Oferta:
            <select
              id="oferta"
              name="oferta"
              value={oferta}
              onChange={(e) => setOferta(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
            >
              <option value="">Seleccionar oferta</option>
              {filteredOferta.map(oferta => (
                <option key={oferta.id} value={oferta.id}>{oferta.descripcion}</option>
              ))}
            </select>
          </label>

          <label htmlFor="cohorte" className="block">
            Cohorte:
            <select
              id="cohorte"
              name="cohorte"
              value={cohorte}
              onChange={(e) => setCohorte(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"
            >
              <option value="">Seleccionar cohorte</option>
              {cohorte.map(cohorte => (
                <option key={cohorte.id} value={cohorte.id}>{cohorte.descripcion}</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Agregar Instituto
          </button>
        </form>
      </div>
    </div>
  );
}

export default OfertaMatricula;
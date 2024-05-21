import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BMInstituto(props) {
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [tipoinstitutos, setTipoInstitutos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [tipoInstitutoId, setTipoInstitutoId] = useState(null);
  const [ciudadId, setCiudadId] = useState(null);
  const [sucursalId, setSucursalId] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const loadInstitutos = useCallback((isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/instituto/lista")
        .then((response) => {
          setInstitutos(response.data);
          setFilteredInstitutos(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de Institutos:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = institutos.filter((instituto) =>
        instituto.denominacion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInstitutos(filtered);
    }
  }, [institutos]);

  const loadTiposInstitutos = useCallback(() => {
    axios.get("http://localhost:3001/tipoinstituto/lista")
      .then((response) => {
        setTipoInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de instituto:", error);
      });
  }, []);

  const loadCiudades = useCallback(() => {
    axios.get("http://localhost:3001/ciudad/lista")
      .then((response) => {
        setCiudades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ciudades:", error);
      });
  }, []);

  const loadSucursales = useCallback(() => {
    axios.get("http://localhost:3001/sucursal/lista")
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las sucursales:", error);
      });
  }, []);

  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
  }, [loadInstitutos, loadTiposInstitutos, loadCiudades, loadSucursales]);

  const editInstituto = (institutoId) => {
    const institutoToEdit = institutos.find((instituto) => instituto.id === institutoId);
    if (institutoToEdit) {
      setSelectedInstituto(institutoToEdit);
      setNewDenominacion(institutoToEdit.denominacion);
      setTipoInstitutoId(institutoToEdit.tipoinstitutoId);
      setCiudadId(institutoToEdit.CiudadId);
      setSucursalId(institutoToEdit.sucursalId);
    }
  };

  const cancelCerrar = () => {
    navigate("/inspector");
  };

  const cancelEdit = () => {
    setSelectedInstituto(null);
    setNewDenominacion("");
    setTipoInstitutoId(null);
    setCiudadId(null);
    setSucursalId(null);
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/instituto/actualizar/${selectedInstituto.cue}`, {
        denominacion: newDenominacion,
        ee: selectedInstituto.ee,
        cuesede: selectedInstituto.cuesede,
        tipoinstitutoId: tipoInstitutoId,
        CiudadId: ciudadId,
        sucursalId: sucursalId,
      })
      .then((response) => {
        setSelectedInstituto(null);
        setNewDenominacion("");
        setTipoInstitutoId(null);
        setCiudadId(null);
        setSucursalId(null);
        loadInstitutos();
        console.log("Instituto editado correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar el instituto:", error);
      });
  };

  const deleteInstituto = (institutoId) => {
    axios
      .delete(`http://localhost:3001/instituto/eliminar/${institutoId}`)
      .then((response) => {
        loadInstitutos();
        setSelectedInstituto(null);
        setNewDenominacion("");
        setTipoInstitutoId(null);
        setCiudadId(null);
        setSucursalId(null);
        console.log("Instituto eliminado correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar el instituto:", error);
      });
  };

  return (
    <div className="bg-sky-800 text-white py-4 px-6 rounded-md w-full max-w-2xl mx-auto">
      <h2 className="text-lg font-bold mb-4 text-white">Edición de Institutos</h2>
      
      <div className="bg-sky-600 text-white font-bold rounded mb-4 p-2">
        <input
          id="searchQuery"
          className="border-primary rounded-md w-full h-10 p-2"
          placeholder="Buscar instituto"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            loadInstitutos(true);
          }}
        />
      </div>

      {selectedInstituto ? (
        <div className="mt-4 bg-sky-700 p-4 rounded-md">
          <h3 className="text-xl font-bold mb-2">
            Editar Instituto: {selectedInstituto.denominacion}
          </h3>
          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
            type="text"
            value={newDenominacion}
            onChange={(e) => setNewDenominacion(e.target.value)}
          />

          <label htmlFor="tipoinstitutoId" className="block mb-2">
            Tipoinstituto:
            <select
              id="tipoinstitutoId"
              name="tipoinstitutoId"
              value={tipoInstitutoId}
              onChange={(e) => setTipoInstitutoId(e.target.value)}
              className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Tipo de Instituto</option>
              {tipoinstitutos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="ciudadId" className="block mb-2">
            Ciudad:
            <select
              id="ciudadId"
              name="ciudadId"
              value={ciudadId}
              onChange={(e) => setCiudadId(e.target.value)}
              className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="sucursalId" className="block mb-4">
            Sucursal:
            <select
              id="sucursalId"
              name="sucursalId"
              value={sucursalId}
              onChange={(e) => setSucursalId(e.target.value)}
              className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Sucursal</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.descripcion}
                </option>
              ))}
            </select>
          </label>

          <div className="flex space-x-2">
            <button
              className="w-24 bg-sky-600 text-white font-bold hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
              onClick={confirmEdit}
            >
              Confirmar
            </button>
            <button
              className="w-24 border-red-300 font-bold bg-red-300 text-white hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}

      <ul className="mt-4 space-y-2">
        {filteredInstitutos.map((instituto) => (
          <li
            key={instituto.id}
            className=" text-white font-bold rounded p-2 flex justify-between items-center"
          >
            <div>
              <div className="table-cell">{instituto.denominacion}</div>
              {instituto.tipoinstituto && (
                <div className="text-sm">Tipo de Instituto: {instituto.tipoinstituto.descripcion}</div>
              )}
              {instituto.ciudad && (
                <div className="text-sm">Ciudad: {instituto.ciudad.nombre}</div>
              )}
              {instituto.sucursal && (
                <div className="text-sm">Sucursal: {instituto.sucursal.descripcion}</div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                className="w-24 bg-sky-600 text-white font-bold hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
                onClick={() => editInstituto(instituto.id)}
              >
                Editar
              </button>
              <button
                className="w-24 border-red-300 font-bold bg-red-300 text-white hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
                onClick={() => deleteInstituto(instituto.cue)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 w-24 bg-gray-700 text-white font-bold hover:bg-gray-800 py-1 rounded focus:outline-none focus:shadow-outline"
        onClick={cancelCerrar}
      >
        Cerrar
      </button>
    </div>
  );
}

export default BMInstituto;
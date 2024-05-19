import React, { useEffect, useState, useRef } from "react";
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


  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
  }, []);

  const loadInstitutos = (isSearch = false) => {
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
  };

  const loadTiposInstitutos = () => {
    axios.get("http://localhost:3001/tipoinstituto/lista")
      .then((response) => {
        setTipoInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de instituto:", error);
      });
  };

  const loadCiudades = () => {
    axios.get("http://localhost:3001/ciudad/lista")
      .then((response) => {
        setCiudades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las ciudades:", error);
      });
  };

  const loadSucursales = () => {
    axios.get("http://localhost:3001/sucursal/lista")
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las sucursales:", error);
      });
  };

 

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
    <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-auto sm:w-[150px]">
      <h2 className="text-lg font-bold mb-4 text-white">Edición de Institutos</h2>

      <div className="flex justify-between items-center bg-sky-600 text-white font-bold rounded">
        <div className="rounded-md w-full sm:w-[800px] bg-sky-600 text-white font-bol">
          <input
            id="searchQuery"
            className="border-primary rounded-md w-full h-[50px]"
            placeholder="Buscar instituto"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              loadInstitutos(true);
            }}
          />
        </div>
      </div>

      {selectedInstituto ? (
        <div className="mt-4 rounded-md w-full sm:w-[800px]">
          <h3 className="text-xl font-bold mb-2 cursor-pointer">
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

          <label htmlFor="tipoinstitutoId" className="block">
            Tipoinstituto:
            <select
              id="tipoinstitutoId"
              name="tipoinstitutoId"
              value={tipoInstitutoId}
              onChange={(e) => setTipoInstitutoId(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Tipo de Instituto</option>
              {tipoinstitutos.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
              ))}
            </select>
          </label>

          <label htmlFor="ciudadId" className="block">
            Ciudad:
            <select
              id="ciudadId"
              name="ciudadId"
              value={ciudadId}
              onChange={(e) => setCiudadId(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Ciudad</option>
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
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-black"
            >
              <option value="">Seleccionar Sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal.id} value={sucursal.id}>{sucursal.descripcion}</option>
              ))}
            </select>
          </label>

          <div class="">
  <button
    class="mt-2 w-24 bg-sky-600 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
    onClick={confirmEdit}
  >
    Confirmar
  </button>
  <button
    class="mt-2 w-24 border-red-300 font-bold bg-red-300 text-white hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
    onClick={cancelEdit}
  >
    Cancelar
  </button>
  
</div>
        </div>
      ) : null}

      <ul className="rounded-md w-[800px] mt-4 space-y-5">
        {filteredInstitutos.map((instituto) => (
          <li
            key={instituto.id} //"bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline mb-8 text-center block w-full
            className="bg-sky-600 text-white font-bold rounded cursor-pointer flex justify-between items-center"
          >
            {instituto.denominacion}
            <div>
              <button
                className=" px-4 py-2 text-sm border bg-sky-600 text-white font-bold hover:bg-gray-700 rounded-md mr-2"
                onClick={() => editInstituto(instituto.id)}
              >
                Editar
              </button>
              <button
        className="border-2 rounded-lg border-red-300 h-10 w-20 text-sm bg-red-300 text-white"
        onClick={() => deleteInstituto(instituto.cue)}
      >
        Eliminar
      </button>
    </div>
    {instituto.tipoinstituto && (
      <div>
        Tipo de Instituto: {instituto.tipoinstituto.descripcion}
      </div>
    )}
    {instituto.ciudad && (
      <div>
        Ciudad: {instituto.ciudad.nombre}
      </div>
    )}
    {instituto.sucursal && (
      <div>
        Sucursal: {instituto.sucursal.descripcion}
      </div>
    )}
  </li>
))}
</ul>

  <button
    class="mt-2 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
    onClick={cancelCerrar}
  >
    Cerrar
  </button>
  
</div>
);
}

export default BMInstituto;
import React, { useEffect, useState, useRef } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/20/solid";

function InstitutoList(props) {
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const [newEe, setNewEe] = useState("");
  const [newCuesede, setNewCuesede] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [tipoinstitutos, setTipoInstitutos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [tipoInstitutoId, setTipoInstitutoId] = useState(null);
  const [ciudadId, setCiudadId] = useState(null);
  const [sucursalId, setSucursalId] = useState(null);
  const [showDetails, setShowDetails] = useState(null); //useState([]);  useState(false);
  const [ofertas, setOfertas] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadInstitutos();
    loadTiposInstitutos();
    loadCiudades();
    loadSucursales();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/instituto/lista")
      .then((response) => {
        setInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
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
      console.log("ingreso a editar");
      setSelectedInstituto(institutoToEdit);
      setNewEe(institutoToEdit.ee);
      setNewDenominacion(institutoToEdit.denominacion);
      setNewCuesede(institutoToEdit.cuesede);
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
    setNewEe("");
    setNewDenominacion("");
    setNewCuesede("");
    setTipoInstitutoId(null);
    setCiudadId(null);
    setSucursalId(null);
    //setOfertas([]);
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/instituto/actualizar/${selectedInstituto.cue}`, {
        ee: newEe,
        denominacion: newDenominacion,
        cuesede: newCuesede,
        tipoinstitutoId: tipoInstitutoId,
        CiudadId: ciudadId,
        sucursalId: sucursalId,
      })
      .then((response) => {
        setSelectedInstituto(null);
        setNewEe ("");
        setNewDenominacion("");
        setNewCuesede("");
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#1e40af",
      confirmButtonText: "¡Sí, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/instituto/eliminar/${institutoId}`)
          .then((response) => {
            loadInstitutos();
            setSelectedInstituto(null);
            setNewEe ("");
            setNewDenominacion("");
            setNewCuesede ("");
            setTipoInstitutoId(null);
            setCiudadId(null);
            setSucursalId(null);
            Swal.fire("¡Eliminado!", "El instituto ha sido eliminado.", "success");
            console.log("Instituto eliminado correctamente");
          })
          .catch((error) => {
            Swal.fire("Error", "Hubo un error al eliminar el instituto", "error");
            console.error("Error al eliminar el instituto:", error);
          });
      }
    });
  };

  const showInstitutoDetail  = (institutoId) => {
    const fixedInstitutoId = "14151622";
    console.log("institutoId:", fixedInstitutoId);

    axios.get(`http://localhost:3001/instituto/listaqueryfiltro/${fixedInstitutoId}`)
      .then((response) => {
        setShowDetails(response.data);
        console.log("institutoId show:", institutoId);
        console.log("Datos obtenidos show:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el detalle de ofertas:", error);
      });
  };


  return (
    <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-3">EDITAR - ELIMINAR INSTITUTO</h2>

      {!selectedInstituto && !showDetails && (
  <>
    <div className="flex justify-between items-center bg-sky-600 text-white font-bold rounded">
  <div className="rounded-md w-full bg-sky-600 text-sky-800 font-bold">
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

    <table className="mt-4 w-full">
      <thead>
        <tr>
          <th className="bg-sky-600 text-white font-bold px-4 py-2">Denominación</th>
          <th className="bg-sky-600 text-white font-bold px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {filteredInstitutos.map((instituto, index) => (
          <tr key={instituto.id} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold rounded my-4`}>
            <td className="px-4 py-4">{instituto.denominacion}</td>
            <td className="px-4 py-2">
              <div className="flex space-x-2">
                <button
                  className="p-1 border-2 rounded-lg bg-white text-sky-600"
                  onClick={() => showInstitutoDetail(instituto.id)}
                >
                  <EyeIcon className="h-5 w-5 mr-1" />
                </button>
                <button
                  className="p-1 border-2 rounded-lg bg-white text-sky-600"
                  onClick={() => editInstituto(instituto.id)}
                >
                  <PencilIcon className="h-5 w-5 mr-1" />
                </button>
                <button
                  className="flex items-center justify-center border-2 rounded-lg border-red-300 h-8 w-9 text-sm bg-red-300 text-white"
                  onClick={() => deleteInstituto(instituto.cue)}
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

      {selectedInstituto && (
        <div className="mt-4 rounded-md w-full">
          <h3 className="text-xl font-bold mb-2 cursor-pointer">
            Editar Instituto: {selectedInstituto.denominacion}
          </h3>
          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
            type="text"
            value={newEe}
            onChange={(e) => setNewEe(e.target.value)}
          />

          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
            type="text"
            value={newDenominacion}
            onChange={(e) => setNewDenominacion(e.target.value)}
          />

          <input
            ref={inputRef}
            autoFocus={true}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
            type="text"
            value={newCuesede }
            onChange={(e) => setNewCuesede (e.target.value)}
          />

          <label htmlFor="tipoinstitutoId" className="block">
            Tipoinstituto:
            <select
              id="tipoinstitutoId"
              name="tipoinstitutoId"
              value={tipoInstitutoId}
              onChange={(e) => setTipoInstitutoId(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona un tipo de instituto</option>
              {tipoinstitutos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </option>
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
              className="w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
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
              className="w-full py-2 px-3 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona una sucursal</option>
              {sucursales.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.descripcion}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-between mt-4">
            <button
              className="border-2 rounded-lg border-green-300 h-10 w-20 text-sm bg-green-300 text-white"
              onClick={confirmEdit}
            >
              Confirmar
            </button>
            <button
              className="border-2 rounded-lg border-blue-300 h-10 w-20 text-sm bg-blue-300 text-white"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {/* FINAL selectedInstituto */}
      {showDetails && (
        <div>
          <h3 className="text-center text-lg font-bold mb-4">Detalles del Instituto</h3>
          <div className="mb-4">
            <p><strong>Cue:</strong> {showDetails.cue}</p>
            <p><strong>Ee:</strong> {showDetails.ee}</p>
            <p><strong>Tipo:</strong> {showDetails.tipo_isntituto}</p>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={() => setShowDetails(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/*FINAL showDetails */}
      <button
        className="border-2 rounded-lg border-blue-300 h-10 w-20 text-sm bg-blue-300 text-white"
        onClick={cancelCerrar}
      >
        Cerrar
        </button>
      </div>
    );
  }

  export default InstitutoList;
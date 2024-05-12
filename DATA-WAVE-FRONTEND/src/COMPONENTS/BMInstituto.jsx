import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function BMInstituto(props) {
  const [institutos, setInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadInstitutos();
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

  const editInstituto = (institutoId) => {
    const institutoToEdit = institutos.find((instituto) => instituto.id === institutoId);
    if (institutoToEdit) {
      setSelectedInstituto(institutoToEdit);
      setNewDenominacion(institutoToEdit.denominacion);
    }
  };

  const cancelEdit = () => {
    setSelectedInstituto(null);
    setNewDenominacion("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/instituto/actualizar/${selectedInstituto.cue}`, {
        denominacion: newDenominacion,
        ee: selectedInstituto.ee,
        cuesede: selectedInstituto.cuesede,
        tipoinstitutoId: selectedInstituto.tipoinstitutoId,
        CiudadId: selectedInstituto.CiudadId,
        sucursalId: selectedInstituto.sucursalId,
      })
      .then((response) => {
        setSelectedInstituto(null);
        setNewDenominacion("");
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
        console.log("Instituto eliminado correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar el instituto:", error);
      });
  };

  return (
    <div div className="bg-sky-800 text-white py-2 px-4 rounded-md w-auto">
      <h2 className="text-lg font-bold mb-4 text-white">Edición de Institutos</h2>

      <div className="flex justify-between items-center bg-sky-600 text-white font-bold rounded">
        <div className="rounded-md w-[800px] bg-sky-600 text-white font-bol">
          <input
            id="searchQuery"
            className="border-2 border-primary rounded-md w-full h-[50px] "
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
        <div className="mt-4 rounded-md w-[800px]">
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
          <button
            className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
            onClick={confirmEdit}
          >
            Confirmar
          </button>
          <button
            className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        </div>
      ) : null}

      <ul className="mt-4 bg-sky-600 text-white font-bold rounded">
        {filteredInstitutos.map((instituto) => (
          <div
            className=" bg-sky-600 text-white shadow-lg rounded-lg p-6 mb-4 flex justify-between items-center h-20 w-[800px]"
            key={instituto.cue}
          >
            <input
              className="text-left align-middle w-1/2 p-2 mr-2 bg-sky-600 text-white"
              readOnly={true}
              type="text"
              value={instituto.denominacion}
            />
            <div className="flex items-center space-x-4">
              <button
                className="border-2 rounded-lg h-10 w-20 text-sm bg-blue-300 text-white"
                onClick={() => editInstituto(instituto.cue)}
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
          </div>
        ))}
      </ul>
    </div>
  );
}

export default BMInstituto;
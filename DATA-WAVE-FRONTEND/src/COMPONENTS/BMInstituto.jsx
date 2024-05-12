import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminEditProduct(props) {
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
    <div className="min-h-screen p-23">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Edición de Institutos</h2>
  
        <div className="flex justify-between items-center">
          <div className="rounded-md max-w-xs">
            <input
              id="searchQuery"
              className="border-2 border-primary rounded-md w-[380px] h-[50px]"
              placeholder="Buscar instituto"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                loadInstitutos(true);
              }}
            />
          </div>
          <div className="ml-auto">
            <Link to="/crearInstituto">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
                Crear instituto
              </button>
            </Link>
          </div>
        </div>
  
        {selectedInstituto ? (
          <div className="mt-4 rounded-md max-w-xl">
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
  
        <ul className="mt-4">
          {filteredInstitutos.map((instituto) => (
            <div
              className="shadow-lg rounded-lg p-6 bg-primary mb-4 flex justify-between items-center h-20"
              key={instituto.cue}
            >
              <input
                className="text-left align-middle w-1/2 p-2 mr-2 bg-primary font-bold"
                readOnly={true}
                type="text"
                value={instituto.denominacion}
              />
              <div className="flex items-center space-x-4">
                <button
                  className="border-2 rounded-lg border-blue-300 h-10 w-20 text-sm bg-blue-300 text-white"
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
  
        <div className="flex justify-between mt-4">
          <Link to="/modCategoria">
            <button className="border border-blue-300 text-blue-300 p-2 rounded-md">
              ABM
            </button>
          </Link>
          <Link to="/logout">
            <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProduct;




{/*import React, { useEffect, useState, useRef } from "react";
import axios from "axios";


import { Link } from "react-router-dom";

function AdminEditInstituto(props) {
  const [instituto, setInstituto] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newInstitutoName, setNewInstitutoName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstituto, setFilteredInstituto] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadInstituto();
  }, []);

  const loadInstituto = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/instituto/lista")
        .then((response) => {
          setInstituto(response.data);
          setFilteredInstituto(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de instituto:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = instituto.filter((instituto) =>
        instituto.denominacion.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInstituto(filtered);
    }
  };

  const editInstituto = (institutoId) => {
    const institutoToEdit = instituto.find((instituto) => instituto.id === institutoId);
    if (institutoToEdit) {
      setSelectedInstituto(institutoToEdit);
      setNewInstitutoName(institutoToEdit.denominacion);
    }
  };

  const cancelEdit = () => {
    setSelectedInstituto(null);
    setNewInstitutoName("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/instituto/actualizar/${selectedInstituto.id}`, {
        denominacion: newInstitutoName,
      })
      .then((response) => {
        setSelectedInstituto(null);
        setNewInstitutoName("");
        loadInstituto();
      })
      .catch((error) => {
        console.error("Error al actualizar el Instituto:", error);
      });
    console.log("Instituto editado", "El Instituto ha sido editado correctamente", "success");
  }

  const deleteInstituto = (institutoId) => {
    axios
      .delete(`http://localhost:3001/instituto/eliminar/${institutoId}`)
      .then((response) => {
        loadInstituto();
        setSelectedInstituto(null);
        setNewInstitutoName("");
        console.log("Instituto eliminado", "El Instituto ha sido eliminado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar el Instituto:", error);
      });
  };

  return (
    <div className="relative mt-10 md:mt-28 h-screen/1 overflow-hidden p-12">
      <h2 className="w-full text-left text-xl font-bold text-primary mb-4 mt-4">Edición de Instituto</h2>

      <input
        id="searchQuery"
        className="block mb-2  rounded-md p-2 w-full "
        type="text"
        placeholder="Buscar Instituto"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          loadInstituto(true);
        }}
      />
      
      {selectedInstituto ? (
        <div>
          <h3 className="bg-primary text-xl text-primary font-bold cursor-pointer">
            Editar Instituto: {selectedInstituto.denominacion}
          </h3>
          <input
            id="inputRef"
            ref={inputRef}
            autoFocus={true}
            className="block mb-2  rounded-md p-2 w-full"
            type="text"
            value={newInstitutoName}
            onChange={(e) => setNewInstitutoName(e.target.value)}
          />
          <button
            className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
            onClick={confirmEdit}
          >
            Confirmar
          </button>
          <button
            className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
            onClick={cancelEdit}
          >
            Cancelar
          </button>
        </div>
      ) : null}

      <ul>
        {filteredInstituto.map((instituto) => (
          <div className="flex" key={instituto.id}>
            <input
              key={instituto.id}
              className="text-center align-middle border-primary max-w-sm border-2 rounded-md p-3 m-2"
              readOnly={true}
              type="text"
              value={instituto.denominacion}
            />
            <button
              className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
              onClick={() => editInstituto(instituto.id)}
            >
              Editar
            </button>
            <button
              className="bg-primary text-white cursor-pointer p-3 m-2 rounded-md max-w-xs my-custom-button"
              onClick={() => deleteInstituto(instituto.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AdminEditInstituto;*/}
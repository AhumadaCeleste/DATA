import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

function InstitutoList() {
  const [institutos, setInstitutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
  const [selectedInstituto, setSelectedInstituto] = useState(null);
  const [newDenominacion, setNewDenominacion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadInstitutos();
  }, []);

  const loadInstitutos = () => {
    axios
      .get("http://localhost:3001/instituto/listaquery")
      .then((response) => {
        setInstitutos(response.data);
        setFilteredInstitutos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de institutos:", error);
      });
  };

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = institutos.filter((instituto) =>
      searchWords.every((word) =>
        Object.values(instituto).some((value) =>
          typeof value === "string" && value.toLowerCase().includes(word)
        )
      )
    );
    setFilteredInstitutos(filtered);
  }, [searchQuery, institutos]);

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

  const cancelCerrar = () => {
    navigate("/inspector");
  };

  return (
    <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-2">LISTA DE INSTITUTOS</h2>

      <div className="mb-4">
        <input
          className="border-primary rounded-md w-full h-[50px] p-2 text-sky-800 font-bold"
          placeholder="Buscar institutos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y w-full rounded-md text-sm">
          <thead>
            <tr>
              <th className="mt-2 w-10 bg-sky-500 text-white font-bold py-2 px-2">CUE</th>
              <th className="mt-2 w-10 bg-sky-500 text-white font-bold py-2 px-2">EE</th>
              <th className="mt-2 bg-sky-500 text-white font-bold py-2 px-2">INSTITUTO</th>
              <th className="mt-2 w-10 bg-sky-500 text-white font-bold py-2 px-2">CUE SEDE</th>
              <th className="mt-2 w-20 bg-sky-500 text-white font-bold py-2 px-2 text-center">TIPO DE INSTITUTO</th>
              <th className="mt-2 w-20 bg-sky-500 text-white font-bold py-2 px-2">CIUDAD</th>
              <th className="mt-2 w-20 bg-sky-500 text-white font-bold py-2 px-2">SUCURSAL</th>
              <th className="mt-2 w-20 bg-sky-500 text-white font-bold py-2 px-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-sky-600 divide-gray-200 text-white font-bold">
            {filteredInstitutos.map((instituto) => (
              <tr key={instituto.cue}>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.cue}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.ee}</td>
                <td className="px-2 py-4 whitespace-normal text-sm max-w-[400px]">{instituto.denominacion}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.cuesede}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.instituto}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.ciudad}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.departamento}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs flex space-x-2">
                  <PencilIcon
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                    onClick={() => editInstituto(instituto.id)}
                  />
                  <TrashIcon
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => deleteInstituto(instituto.cue)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInstituto && (
        <div className="mt-4 p-4 bg-sky-700 rounded-md">
          <h3 className="text-lg font-bold mb-2">Editar Instituto: {selectedInstituto.denominacion}</h3>
          <input
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            type="text"
            value={newDenominacion}
            onChange={(e) => setNewDenominacion(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="mt-2 w-24 bg-green-500 text-white font-bold py-2 px-2 rounded"
              onClick={confirmEdit}
            >
              Confirmar
            </button>
            <button
              className="mt-2 w-24 bg-red-300 text-white font-bold py-2 px-2 rounded"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2">
        <span>Total registros: {institutos.length}</span>
        <div className="space-x-2">
          <button
            className="mt-2 w-24 bg-red-300 text-white font-bold py-2 px-2 rounded"
            onClick={cancelCerrar}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstitutoList;
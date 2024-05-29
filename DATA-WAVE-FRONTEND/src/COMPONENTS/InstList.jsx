import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InstitutoList() {
  const [institutos, setInstitutos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstitutos, setFilteredInstitutos] = useState([]);
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
              <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CUE</th>
              <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">EE</th>
              <th className="mt-2 w-64 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">INSTITUTO</th>
              <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CUE SEDE</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline text-center">TIPO DE INSTITUTO</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CIUDAD</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">Departamento</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">SUCURSAL</th>
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
                <td className="px-2 py-4 whitespace-nowrap text-xs">{instituto.sucursal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2">
        <span>Total registros: {institutos.length}</span>
        <span>Registros filtrados: {filteredInstitutos.length}</span>
      </div>

      <button
        className="mt-2 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
        onClick={cancelCerrar}
      >
        Cerrar
      </button>
    </div>
  );
}

export default InstitutoList;
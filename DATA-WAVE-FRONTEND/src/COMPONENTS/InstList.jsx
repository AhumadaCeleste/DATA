import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const filtered = institutos.filter((instituto) =>
      instituto.denominacion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInstitutos(filtered);
  }, [searchQuery, institutos]);

  const cancelCerrar = () => {
    navigate("/inspector");
  };

  return (
    <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
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
        <table className="min-w-full divide-y w-full rounded-md text-base">
          <thead>
            <tr>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CUE</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">EE</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">INSTITUTO</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CUE SEDE</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline text-center">TIPO DE INSTITUTO</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CIUDAD</th>
              {/*<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>*/}
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">SUCURSAL</th>
            </tr>
          </thead>
          <tbody className="bg-sky-600 divide-gray-200 text-white font-bold">
            {filteredInstitutos.map((instituto) => (
              <tr key={instituto.cue}>
                <td className="px-2 py-4 whitespace-nowrap text-base max-w-[100px]">{instituto.cue}</td>
                <td className="px-2 py-4 whitespace-nowrap text-base max-w-[100px]">{instituto.ee}</td>
                <td className="px-2 py-4 whitespace-nowrap text-base max-w-[200px]">{instituto.denominacion}</td>
                <td className="px-3 py-4 whitespace-nowrap text-base max-w-[100px]">{instituto.cuesede}</td>
                <td className="px-4 py-4 whitespace-nowrap text-base max-w-[150px]">{instituto.instituto}</td>
                <td className="px-2 py-4 whitespace-nowrap text-base max-w-[100px]">{instituto.ciudad}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 max-w-[150px]">{instituto.departamento}</td> */}
                <td className="px-2 py-4 whitespace-nowrap text-base max-w-[150px]">{instituto.sucursal}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
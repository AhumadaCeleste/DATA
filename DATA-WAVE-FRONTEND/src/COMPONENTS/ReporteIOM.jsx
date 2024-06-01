import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReporteIOM() {
  const [reporte, setReporte] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReporte, setFilteredReporte] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadReporteIOM();
  }, []);

  const loadReporteIOM = () => {
    axios
      .get("http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula")
      .then((response) => {
        setReporte(response.data);
        setFilteredReporte(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de ofertas:", error);
      });
  };

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = reporte.filter((reporte) =>
      searchWords.every((word) =>
        Object.entries(reporte).some(([key, value]) => {
          if (typeof value === "string" && value.toLowerCase().includes(word)) {
            return true;
          } else if (typeof value === "number" && value.toString().includes(word)) {
            return true;
          }
          return false;
        })
      )
    );
    setFilteredReporte(filtered);
  }, [searchQuery, reporte]);

  const cancelCerrar = () => {
    navigate("/inspector");
  };

  return (
    <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-2">LISTA DE OFERTAS</h2>

      <div className="mb-4">
        <input
          className="border-primary rounded-md w-full h-[50px] p-2 text-sky-800 font-bold"
          placeholder="Buscar ofertas"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y w-full rounded-md text-sm">
          <thead>
            <tr>
              <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">INSTITUTO</th>
              <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CUE</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">OFERTA</th>
               <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">AÑO</th>
              <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">MATRICULA</th>
               {/*<th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">APERTURA</th>*/}
            </tr>
          </thead>
          <tbody className="bg-sky-600 divide-gray-200 text-white font-bold">
            {filteredReporte.map((reporte) => (
              <tr key={reporte.id_reporte}>
                <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[400px]">{reporte.instituto_denominacion}</td>
                <td className="px-2 py-4 whitespace-normal text-sm max-w-[100px]">{reporte.instituto_cue}</td>
                
                <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[400px]">{reporte.oferta_nombre}</td>
                {/* <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{reporte.oferta_sector}</td>*/}
                <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{reporte.oferta_año}</td>
                <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{reporte.oferta_matricula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-xm">
        <span>Total registros: {reporte.length}</span>
        <span>Registros filtrados: {filteredReporte.length}</span>
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

export default ReporteIOM;
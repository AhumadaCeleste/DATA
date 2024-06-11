import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

function OfertaList() {
  const [ofertas, setOfertas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOfertas, setFilteredOfertas] = useState([]);
  const [shownNames, setShownNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadOfertas();
  }, []);

  const loadOfertas = () => {
    axios
      .get("http://localhost:3001/oferta/listafullquery")
      .then((response) => {
        setOfertas(response.data);
        setFilteredOfertas(response.data);
        setShownNames({});
      })
      .catch((error) => {
        console.error("Error al obtener la lista de ofertas:", error);
      });
  };

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = ofertas.filter((oferta) =>
      searchWords.every((word) =>
        Object.entries(oferta).some(([key, value]) => {
          if (typeof value === "string" && value.toLowerCase().includes(word)) {
            return true;
          } else if (typeof value === "number" && value.toString().includes(word)) {
            return true;
          }
          return false;
        })
      )
    );
    setFilteredOfertas(filtered);
    setShownNames((prevNames) => {
      const newNames = {};
      filtered.forEach((oferta) => {
        newNames[oferta.nombre] = true;
      });
      return newNames;
    });
  }, [searchQuery, ofertas]);

  const cancelCerrar = () => {
    navigate("/inspector");
  };

  const printList = () => {
    window.print();
  };

  const exportToExcel = () => {
    const filteredData = filteredOfertas.map((oferta) => ({
      "PLAN DE ESTUDIO": oferta.nombre,
      CODIGO: oferta.resolucion,
      RESOLUCION: oferta.descripcion,
      SECTOR: oferta.sector,
      COHORTE: oferta.cohorte // Assuming 'cohorte' is a field in the oferta object
    }));

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ofertas");
    XLSX.writeFile(workbook, "Ofertas.xlsx");
  };

  return (
    <div className="print-container">
      <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
        <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">CONSULTA DE OFERTAS</h2>
      
        <div className="mt-8">
          <input
            className="no-print border-primary rounded-md w-full h-[50px] p-2 mt-3 text-sky-800 font-bold"
            placeholder="Buscar ofertas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full divide-y w-full rounded-md text-sm">
            <thead>
              <tr>
                <th className="bg-sky-600 text-white font-bold py-2 px-4">PLAN DE ESTUDIO</th>
                <th className="bg-sky-600 text-white font-bold py-2 px-4">CODIGO</th>
                <th className="bg-sky-600 text-white font-bold py-2 px-4">RESOLUCION</th>
                <th className="bg-sky-600 text-white font-bold py-2 px-4">SECTOR</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfertas.map((oferta, index) => (
                <tr key={oferta.id_oferta} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold`}>
                  <td className="px-4 py-4">{oferta.nombre}</td>
                  <td className="px-4 py-4">{oferta.resolucion}</td>
                  <td className="px-4 py-4">{oferta.descripcion}</td>
                  <td className="px-4 py-4">{oferta.sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
        <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm">
          <span>Total registros: {ofertas.length}</span>
          <span>Registros filtrados: {filteredOfertas.length}</span>
         <button
            className="print bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={printList}
          >
            Imprimir
          </button> 
          <button
            className="bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={exportToExcel}
          >
            Exportar a Excel
          </button>
        </div>
      
        <button
          className="mt-4 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={cancelCerrar}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default OfertaList;
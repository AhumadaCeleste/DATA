import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EyeIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

const ReporteGlobal = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [institutosContados, setInstitutosContados] = useState([]);

  useEffect(() => {
    const loadData = () => {
      axios
        .get('http://localhost:3001/instituto/lista')
        .then(response => {
          setData(response.data);
          setFilteredData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    loadData();
  }, []);

  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = data.filter(
      (item) => searchWords.every((word) => Object.entries(item).some(([key, value]) => {
        if (typeof value === "string" && value.toLowerCase().includes(word)) {
          return true;
        } else if (typeof value === "number" && value.toString().includes(word)) {
          return true;
        }
        return false;
      }))
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const showInstitutoDetail = (tipo) => {
    let institutos;
    if (tipo === 'PURO') {
      institutos = filteredData.filter(item => item.tipoinstitutoId === 1);
    } else if (tipo === 'MIXTO') {
      institutos = filteredData.filter(item => item.tipoinstitutoId === 2);
    } else {
      institutos = filteredData;
    }
    setInstitutosContados(institutos);
    setShowDetails(true);
  };

  const totalInstitutos = data.length || 0;
  const totalMatriculaPuros = filteredData.reduce((total, item) => {
    if (item.tipoinstitutoId === 1) {
      return total + (item.oferta_matricula + item.oferta_año2 + item.oferta_año3);
    }
    return total;
  }, 0);
  const totalMatriculaMixtos = filteredData.reduce((total, item) => {
    if (item.tipoinstitutoId === 2) {
      return total + (item.oferta_matricula + item.oferta_año2 + item.oferta_año3);
    }
    return total;
  }, 0);
  const totalPuros = filteredData.filter(item => item.tipoinstitutoId === 1).length;
  const totalMixtos = filteredData.filter(item => item.tipoinstitutoId === 2).length;

  return (
    <div className="print-container bg-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md text-sky-800">CONSULTA - INSTITUTOS</h2>
      <div className="mt-8">
        <input
          className="no-print border-primary rounded-md w-full h-[50px] p-2 mt-3 font-bold"
          type="text"
          placeholder="Buscar datos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {showDetails ? (
        <div className="text-white font-bold bg-gray-700 rounded p-10 relative mb-5">
          <h3>DETALLES DE INSTITUTOS</h3>
          <hr className="my-8 border-t-2 border-white" />
          <div>
            {institutosContados.map((instituto, index) => (
              <div key={index}>
                <p className="my-2"><strong>-</strong> {instituto.denominacion}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setInstitutosContados([]);
              setShowDetails(false);
            }}
            className="p-2 bg-gray-400 text-white rounded absolute bottom-4 right-4 flex items-center"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Regresar
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full divide-y w-full rounded-md text-sm">
            <tbody>
              <tr>
                <th colSpan="8" className="bg-sky-600 text-white font-bold py-4 px-4 w-full relative">
                  TOTAL DE INSTITUTOS: {totalInstitutos}
                  <div className="absolute top-0 right-0 mt-3 mr-32">
                    <button
                      onClick={() => showInstitutoDetail('TOTAL')}
                      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colSpan="8" className="bg-sky-500 text-white font-bold py-4 px-4 w-full relative">
                  TOTAL INSTITUTOS PUROS: {totalPuros}
                  <div className="absolute top-0 right-0 mt-3 mr-32">
                    <button
                      onClick={() => showInstitutoDetail('PURO')}
                      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colSpan="8" className="bg-sky-600 text-white font-bold py-4 px-4 w-full relative">
                  TOTAL INSTITUTOS MIXTOS: {totalMixtos}
                  <div className="absolute top-0 right-0 mt-3 mr-32">
                    <button
                      onClick={() => showInstitutoDetail('MIXTO')}
                      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colSpan="8" className="bg-sky-500 text-white font-bold py-4 px-4 w-full relative">
                  TOTAL MATRICULA PUROS: {totalMatriculaPuros}
                  <div className="absolute top-0 right-0 mt-3 mr-32">
                    <button
                      onClick={() => showInstitutoDetail('PURO')}
                      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colSpan="8" className="bg-sky-600 text-white font-bold py-4 px-4 w-full relative">
                  TOTAL MATRICULA MIXTOS: {totalMatriculaMixtos}
                  <div className="absolute top-0 right-0 mt-3 mr-32">
                    <button
                      onClick={() => showInstitutoDetail('MIXTO')}
                      className="flex items-center justify-center border-2 rounded-lg border-gray-400 h-8 w-9 text-sm bg-gray-400 text-white"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
          <hr className="my-4 border-t-2 border-white" />
          <th className=" text-white font-bold py-2 px-8 rounded-tr-md"></th>
        </div>
      )}
    </div>
  );
};

export default ReporteGlobal;
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";

function OfertaList() {
  const [oferta, setOferta] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOferta, setFilteredOferta] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    loadOferta();
  }, []);

  const loadOferta = () => {
    axios
      .get("http://localhost:3001/oferta/listafullquery")
      .then((response) => {
        setOferta(response.data);
        setFilteredOferta(response.data); 
      })
      .catch((error) => {
        console.error("Error al obtener la lista de ofertas:", error);
      });
  };

  
  useEffect(() => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    const filtered = oferta.filter((oferta) =>
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
    setFilteredOferta(filtered);
  }, [searchQuery, oferta]);


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
            <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">PLAN DE ESTUDIO</th>
            <th className="mt-2 w-16 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">CODIGO</th>
            <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">RESOLUCION</th>
            <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">SECTOR</th>
            <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">DESDE</th>
            <th className="mt-2 w-24 bg-sky-500 text-white font-bold py-2 px-2 focus:outline-none focus:shadow-outline">APERTURA</th>
          </tr>
        </thead>
        <tbody className="bg-sky-600 divide-gray-200 text-white font-bold">
          {filteredOferta.map((oferta) => (
            <tr key={oferta.id_oferta}> 
              <td className="px-2 py-4 whitespace-normal text-sm max-w-[400px]">{oferta.nombre}</td>
              <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{oferta.resolucion}</td>
              <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{oferta.descripcion}</td>
              <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{oferta.sector}</td>
              <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{oferta.desde}</td>
              <td className="px-2 py-4 whitespace-nowrap text-xs max-w-[100px]">{oferta.apertura}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-xm">
      <span>Total registros: {oferta.length}</span>
      <span>Registros filtrados: {filteredOferta.length}</span>
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
  
  export default OfertaList;
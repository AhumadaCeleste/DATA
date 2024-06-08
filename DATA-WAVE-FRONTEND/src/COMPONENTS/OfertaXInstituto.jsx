

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { getOfertas } from "../SERVICE/Reportes.service";

function OfertaPorInstitutoList() {
  const [ofertas, setOfertas] = useState([]);
  const { institutoId } = useParams();
  

  useEffect(() => {
    loadOfertasPorInstituto();
  }, [institutoId]);

  const loadOfertasPorInstituto = () => {
    axios.get("http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula")
      .then((response) => {
        setOfertas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de instituto:", error);
      });
  };


 return (
  <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
  <h2 className="text-lg font-bold text-center py-3">OFERTA X INSTITUTOS</h2>


    <table className="min-w-full divide-y w-full rounded-md text-sm">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la Oferta</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {ofertas.map((oferta) => (
          <tr key={oferta.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.instituto_denominacion}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  
  );
}

export default OfertaPorInstitutoList;

{/* ACA ESTA AJUSTADO EL TAMAÑO Y EL BUSCADOR
  import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function OfertaPorInstitutoList() {
  const [ofertas, setOfertas] = useState([]);
  const { institutoId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOfertas, setFilteredOfertas] = useState([]);

  useEffect(() => {
    loadOfertasPorInstituto();
  }, [institutoId]);

  const loadOfertasPorInstituto = (isSearch = false) => {
    if (!isSearch) {
      axios.get(`http://localhost:3001/instituto/${institutoId}/ofertas`)
        .then((response) => {
          setOfertas(response.data);
          setFilteredOfertas(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas por instituto:", error);
        });
    } else {
      const search = searchQuery.toLowerCase();
      const filtered = ofertas.filter((oferta) =>
        oferta.instituto_denominacion.toLowerCase().includes(search)
      );
      setFilteredOfertas(filtered);
    }
  };

  return (
    <div className="bg-sky-800 text-white mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold text-center py-3">OFERTA X INSTITUTOS</h2>
      
      <input 
        type="text" 
        id="searchQuery" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Buscar ofertas..." 
        className="px-4 py-2 rounded-md w-full mb-4"
      />
      
      <table className="min-w-full divide-y w-full rounded-md text-sm">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la Oferta</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredOfertas.map((oferta) => (
            <tr key={oferta.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.instituto_denominacion}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.matricula}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{oferta.anio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfertaPorInstitutoList;
 */}
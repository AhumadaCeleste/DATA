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
    <div className="bg-sky-800 text-white py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[800px] xl:w-[1000px] max-w-screen-lg mx-auto">
      <h2 className="text-lg font-bold mb-4 text-center">Ofertas por Institutoooo</h2>
      <table className="min-w-full divide-y divide-gray-200">
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
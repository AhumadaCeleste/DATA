import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReporteGlobal = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const loadData = () => {
      axios.get('http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula')
        .then(response => {
          setData(response.data);
          setFilteredData(response.data);
          setShowDetails(true);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    loadData();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Calcula los totales solo si los datos están disponibles
  const totalInstitutos = data.length || 0;
  const totalMatriculaPuros = filteredData.reduce((total, item) => {
    if (item.tipo_instituto === 'PURO') {
      return total + (item.oferta_matricula + item.oferta_año2 + item.oferta_año3);
    }
    return total;
  }, 0);
  const totalMatriculaMixtos = filteredData.reduce((total, item) => {
    if (item.tipo_instituto === 'MIXTO') {
      return total + (item.oferta_matricula + item.oferta_año2 + item.oferta_año3);
    }
    return total;
  }, 0);
  const totalPuros = filteredData.filter(item => item.tipo_instituto === 'PURO').length || 0;
  const totalMixtos = filteredData.filter(item => item.tipo_instituto === 'MIXTO').length || 0;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">Totales</h2>
      <table className="w-full mt-2">
        <tbody>
          <tr>
            <td className="px-4 py-2">Total Institutos:</td>
            <td className="px-4 py-2">{totalInstitutos}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Matrícula Puros:</td>
            <td className="px-4 py-2">{totalMatriculaPuros}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Puros:</td>
            <td className="px-4 py-2">{totalPuros}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Matrícula Mixtos:</td>
            <td className="px-4 py-2">{totalMatriculaMixtos}</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Total Mixtos:</td>
            <td className="px-4 py-2">{totalMixtos}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReporteGlobal;
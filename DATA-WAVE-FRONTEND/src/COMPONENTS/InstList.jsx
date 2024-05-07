import React, { useEffect, useState } from "react";
import axios from "axios";


function InstitutoList() {
  const [instituto, setInstituto] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [numpage, setNumpage] = useState(1);
  const [cantItems, setCantItems] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/instituto/lista")
      .then((response) => {
        setInstituto(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Instituto:", error);
      });
  }, []);

  useEffect(() => {
    loadInstituto();
  }, [numpage, searchQuery]);

  const nextPage = () => {
    if (numpage < Math.ceil(cantItems / 4)) setNumpage(numpage + 1);
  };

  const prevPage = () => {
    if (numpage > 1) setNumpage(numpage - 1);
  };

  const loadInstituto = () => {
    const url = searchQuery
      ? `http://localhost:3001/instituto/lista/${numpage}/${searchQuery}`
      : `http://localhost:3001/instituto/lista/${numpage}`;

    axios.get(url)
      .then((response) => {
        setCantItems(response.data.count);

        if (Array.isArray(response.data.rows)) {
          setInstituto(response.data.rows);
        } else {
          console.error("La respuesta no contiene un array de Institutos:", response.data.rows);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de Institutos:", error);
      });
  };

  return (
    <div style={{ marginTop: '25px' }}>
      <h2 className="titulo_pricipal_paginas text-center mb-4 mt-0 shadow-lg">Lista de Institutos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instituto.map((inst, idx) => (
          <div key={inst.id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-lg font-bold">{inst.denominacion}</h3>
            <p>CUE: {inst.cue}</p>
            <p>EE: {inst.ee}</p>
            <p>CUE Sede: {inst.cuesede}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className={`px-4 py-2 mr-4 ${numpage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
          onClick={prevPage}
          disabled={numpage === 1}
        >
          Anterior
        </button>
        <button
          className={`px-4 py-2 ${numpage === Math.ceil(cantItems / 4) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white rounded`}
          onClick={nextPage}
          disabled={numpage === Math.ceil(cantItems / 4)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default InstitutoList;
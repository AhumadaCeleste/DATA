import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';


const ReporteInstitutoOfertaMatricula = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        axios.get('http://localhost:3001/ofertaxinstituto/lista-instituto-oferta-matricula')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        const searchWords = searchQuery.toLowerCase().split(" ");
        const filtered = data.filter((item) =>
            searchWords.every((word) =>
                Object.entries(item).some(([key, value]) => {
                    if (typeof value === "string" && value.toLowerCase().includes(word)) {
                        return true;
                    } else if (typeof value === "number" && value.toString().includes(word)) {
                        return true;
                    }
                    return false;
                })
            )
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const cancelCerrar = () => {
        navigate("/inspector");
    };

    const printList = () => {
        window.print();
    };
    const exportToExcel = () => {
        const filteredDataExcel = filteredData.map((item) => ({
            "Resolución": item.oferta_resolucion,
            "Nombre": item.oferta_nombre,
            "Código de Plan": item.codigo_plan ? item.codigo_plan : "", // Verificar y proporcionar un valor por defecto si no existe
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(filteredDataExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Instituto Oferta Matrícula");
        XLSX.writeFile(workbook, "InstitutoOfertaMatricula.xlsx");
    };
    return (
        <div className="print-container">
            <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
                <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">REPORTE - GLOBAL</h2>
                
                <div className="mt-8">
                    <input
                        className="no-print border-primary rounded-md w-full h-[50px] p-2 mt-3 text-sky-800 font-bold"
                        placeholder="Buscar datos"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto rounded-md">
                    <table className="min-w-full divide-y w-full rounded-md text-sm">
                        <thead>
                            <tr>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4">OFERTA</th>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4">CODIGO DE PLAN</th>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4">N° DE RES MINISTERIAL</th>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4 no-print">RESOLUCION MINISTERIAL</th>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4 no-print">CODIFIACION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => {
                                let pdfUrl;
                                if (item.oferta_nombre === "TÉCNICATURA SUPERIOR EN DESARROLLO 3D") {
                                    pdfUrl = "https://drive.google.com/file/d/1TYL4Igi7TmekTIDlqNGKicJwwAgbYqB0/view?usp=sharing";
                                } else if (item.oferta_nombre === "TÉCNICATURA SUPERIOR EN HIGIENE DENTAL") {
                                    pdfUrl = "URL_DEL_OTRO_ARCHIVO_EN_GOOGLE_DRIVE";
                                } else {
                                    pdfUrl = "URL_POR_DEFECTO_EN_GOOGLE_DRIVE";
                                }

                                return (
                                    <tr key={index} className={`bg-${index % 2 === 0 ? 'sky-600' : 'sky-500'} text-white font-bold`}>
                                        <td className="px-4 py-4">{item.oferta_nombre}</td>
                                        <td className="px-4 py-4">{item.oferta_resolucion}</td>
                                        <td className="px-4 py-4">{item.oferta_descripcion}</td>
                                        <td className="px-4 py-4">

    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline no-print">
      
    <div className=" bg-gray-400 rounded-lg h-9 w-9 flex items-center justify-center ml-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block">
                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
            </svg>
        </div>
    </a>
</td>
<td className="px-5 py-4">
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline no-print">
        <div className=" bg-gray-400 rounded-lg h-9 w-9 flex items-center justify-center ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block">
                <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
            </svg>
        </div>
    </a>
</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4 space-x-4 font-bold">
                <button
    className="flex items-center justify-center rounded-lg h-10 w-28 text-sm bg-gray-700 text-white hover:bg-gray-600"
    onClick={printList}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
        <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z" clipRule="evenodd" />
    </svg>
    Imprimir
</button>

<button
    className="flex items-center justify-center rounded-lg h-10 w-28 text-sm bg-green-700 text-white hover:bg-green-600"
    onClick={exportToExcel}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-2">
        <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3h-3V1.5a.75.75 0 0 0-1.5 0v5.25Zm0 0h1.5v5.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V6.75Z" clipRule="evenodd" />
        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
    </svg>
    Exportar
</button>
    </div>
    <hr className="my-4 border-t-2 border-white" />
    <div className="mt-3 mb-3 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm leading-8 w-full">
        <span>Total registros: {data.length}</span>
        <span>Registros filtrados: {filteredData.length}</span>
    </div>
            
              
                </div>
            </div>

    );
};

export default ReporteInstitutoOfertaMatricula;
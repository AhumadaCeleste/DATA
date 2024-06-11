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
            "Resolución": item.oferta_descripcion,
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredDataExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Instituto Oferta Matrícula");
        XLSX.writeFile(workbook, "InstitutoOfertaMatricula.xlsx");
    };

    return (
        <div className="print-container">
            <div className="bg-sky-800 text-sky-800 mt-4 space-y-5 overflow-x-auto py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[850px] xl:w-[1000px] max-w-screen-lg mx-auto">
                <h2 className="text-lg font-bold py-2 flex items-center justify-center bg-gray-300 mt-8 h-16 rounded-md">Reporte de Instituto, Oferta y Matrícula</h2>
                
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
                                <th className="bg-sky-600 text-white font-bold py-2 px-4">RESOLUCION MINISTERIAL</th>
                                <th className="bg-sky-600 text-white font-bold py-2 px-4">CODIFIACION</th>
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
                                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="underline">PDF RES.</a>
                                        </td>
                                        <td className="px-4 py-4">
                                            <a href="URL_DEL_ARCHIVO_EN_GOOGLE_DRIVE" target="_blank" rel="noopener noreferrer" className="underline">PDF Cod.</a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center bg-sky-600 text-white font-bold rounded-md p-2 text-sm">
                    <span>Total registros: {data.length}</span>
                    <span>Registros filtrados: {filteredData.length}</span>
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
};

export default ReporteInstitutoOfertaMatricula;
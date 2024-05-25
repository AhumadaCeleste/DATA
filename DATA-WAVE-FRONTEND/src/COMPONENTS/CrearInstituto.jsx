import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function CrearInstitutoFull() {
    const [cue, setCue] = useState("");
    const [ee, setEe] = useState("");
    const [denominacion, setDenominacion] = useState("");
    const [cuesede, setCuesede] = useState("");
    const [tipoinstitutoId, setTipoinstitutoId] = useState("");
    const [CiudadId, setCiudadId] = useState("");
    const [sucursalId, setSucursalId] = useState("");
    const [ciudades, setCiudades] = useState([]);
    const [tipoinstituto, setTipoinstituto] = useState([]);
    const [sucursal, setSucursal] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/ciudad/lista")
            .then(response => {
                setCiudades(response.data);
            })
            .catch(error => {
                console.error("Error al obtener ciudades:", error);
            });

        axios
            .get("http://localhost:3001/tipoinstituto/lista")
            .then(response => {
                setTipoinstituto(response.data);
            })
            .catch(error => {
                console.error("Error al obtener tipo instituto:", error);
            });

        axios
            .get("http://localhost:3001/sucursal/lista")
            .then(response => {
                setSucursal(response.data);
            })
            .catch(error => {
                console.error("Error al obtener la sucursal:", error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoinstitutofull = {
            cue,
            ee,
            denominacion,
            cuesede,
            tipoinstitutoId,
            CiudadId,
            sucursalId
        };
        try {
            const res = await axios.post(
                "http://localhost:3001/instituto/nuevo",
                nuevoinstitutofull
            );
            console.log(res);
            alert("Instituto Agregado");
        } catch (error) {
            alert(`Error tipo: ${error.response.data.msg}`);
            console.log("Error al enviar el mensaje al back:", error);
        }
    };

    const cancelCerrar = () => {
        navigate("/inspector");
    };
    //sm:w-[400px]h-[800px] m-4 lg:w-[700px] xl:w-[400px] overflow-y max-h-[85vh]
    return (
        <div
            className="bg-sky-800 text-white py-2 px-4 rounded-md w-full sm:w-[400px] lg:w-[800px] xl:w-[1000px] max-w-screen-lg">
            <div className="bg-sky-800 text-white py-2 px-4 rounded-md flex flex-col">
                <h2 className="text-lg font-bold mb-4">Crear Instituto</h2>
                <form onSubmit={handleSubmit} className="space-y-6 font-bold flex-1">
                    <label htmlFor="cue" className="block text-white">
                        Cue:
                        <input
                            type="text"
                            id="cue"
                            name="cue"
                            value={cue}
                            onChange={(e) => setCue(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"/>
                    </label>

                    <label htmlFor="ee" className="block text-white">
                        EE:
                        <input
                            type="text"
                            id="ee"
                            name="ee"
                            value={ee}
                            onChange={(e) => setEe(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"/>
                    </label>

                    <label htmlFor="denominacion" className="block text-white">
                        Denominacion:
                        <input
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            value={denominacion}
                            onChange={(e) => setDenominacion(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"/>
                    </label>

                    <label htmlFor="cuesede" className="block text-white">
                        Cue Anexo - Extensión Aulica:
                        <input
                            type="text"
                            id="cuesede"
                            name="cuesede"
                            value={cuesede}
                            onChange={(e) => setCuesede(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800"/>
                    </label>

                    <label htmlFor="tipoinstitutoId" className="block text-white">
                        Tipo de Instituto:
                        <select
                            id="tipoinstitutoId"
                            name="tipoinstitutoId"
                            value={tipoinstitutoId}
                            onChange={(e) => setTipoinstitutoId(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800">
                            <option value="">Seleccionar Tipo Instituto</option>
                            {
                                tipoinstituto.map((tipoinstituto) => (
                                    <option key={tipoinstituto.id} value={tipoinstituto.id}>{tipoinstituto.descripcion}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor="CiudadId" className="block text-white">
                        Ciudad:
                        <select
                            id="CiudadId"
                            name="CiudadId"
                            value={CiudadId}
                            onChange={(e) => setCiudadId(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800">
                            <option value="">Seleccionar ciudad</option>
                            {
                                ciudades.map(
                                    (ciudad) => (<option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>)
                                )
                            }
                        </select>
                    </label>

                    <label htmlFor="sucursalId" className="block text-white">
                        Sucursal:
                        <select
                            id="sucursalId"
                            name="sucursalId"
                            value={sucursalId}
                            onChange={(e) => setSucursalId(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800">
                            <option value="">Seleccionar la sucursal</option>
                            {
                                sucursal.map(
                                    (sucursal) => (<option key={sucursal.id} value={sucursal.id}>{sucursal.descripcion}</option>)
                                )
                            }
                        </select>
                    </label>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="w-24 bg-sky-600 text-white font-bold hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline">
                            Agregar
                        </button>
                        <button
                            className="w-24 border-red-300 font-bold bg-red-300 text-white hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
                            onClick={cancelCerrar}>
                            Cancelar
                        </button>
                    </div>
                </form>
                
        <button
            className="mt-2 w-24 bg-gray-700 text-white font-bold hover:bg-gray-700 py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={cancelCerrar}
        >
            Cerrar
        </button>
            </div>
        </div>
    );
}

export default CrearInstitutoFull;
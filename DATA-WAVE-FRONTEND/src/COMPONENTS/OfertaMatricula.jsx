import React, {useState, useEffect} from "react";
import axios from "axios";

function OfertaMatricula() {

    const [matricula, setMatricula] = useState("");
    const [matricula2, setMatricula2] = useState("");
    const [matricula3, setMatricula3] = useState("");
    //const currentYear = new Date().getFullYear();
    //const [año, setAño] = useState(currentYear);
    const [institutoCue, setInstitutoCue] = useState("");
    const [ofertumId, setOfertumId] = useState("");
    const [institutos, setInstitutos] = useState([]);
    const [ofertas, setOfertas] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/instituto/listafull")
            .then(response => {
                setInstitutos(response.data);
            })
            .catch(error => {
                console.error("Error al obtener institutos:", error);
            });

        axios
            .get("http://localhost:3001/oferta/listafull")
            .then(response => {
                setOfertas(response.data);
            })
            .catch(error => {
                console.error("Error al obtener oferta:", error);
            });

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const CargaMatricula = {
            institutoCue,
            ofertumId,
            matricula,
            matricula2,
            matricula3,
        };
        try {
            const res = await axios.post(
                "http://localhost:3001/ofertaxinstituto/nuevo",
                CargaMatricula
            );
            console.log(res);
            alert("Instituto Oferta Agregada");
            //navigate('/secretario');
        } catch (error) {
            alert(`Error tipo: ${error.response.data.msg}`);
            console.log("Error al enviar el mensaje al back:", error);
        }
    };

    const cancelCerrar = () => {
        //navigate("/secretario");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div
                className="bg-sky-800 text-white py-4 px-6 rounded-md w-[50vw] max-w-screen-lg">
                <h2 className="text-lg font-bold mb-4 text-sky-800">Cargar Instituto</h2>
                <form onSubmit={handleSubmit} className="space-y-6 font-bold">
                    <label htmlFor="institutoCue" className="block">
                        Seleccione el Instituto a cargar Matricula:
                        <select
                            id="institutoCue"
                            name="institutoCue"
                            value={institutoCue}
                            onChange={(e) => setInstitutoCue(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800">
                            <option value="">Seleccionar Instituto</option>
                            {
                                institutos.map(instituto => (
                                    <option key={instituto.cue} value={instituto.cue}>{` ${instituto.denominacion} CUE: ${instituto.cue}  ${instituto.tipoinstituto.descripcion}`}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor="ofertumId" className="block ">
                        Seleccione la Oferta a cargar Matricula:
                        <select
                            id="ofertumId"
                            name="ofertumId"
                            value={ofertumId}
                            onChange={(e) => setOfertumId(e.target.value)}
                            required="required"
                            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sky-800">
                            <option value="">Seleccionar Oferta</option>
                            {
                                ofertas.map(oferta => (
                                    <option key={oferta.id} value={oferta.id}>{`${oferta.nombre} Res: ${oferta.resolucion} Cohorte desde: ${oferta.cohorte.desde}`}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor="matricula" className="block text-white">
                        Matricula:
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                id="matricula"
                                name="matricula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                required="required"
                                className="text-sky-800 w-1/3 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                            <input
                                type="text"
                                id="matricula2"
                                name="matricula2"
                                value={matricula2}
                                onChange={(e) => setMatricula2(e.target.value)}
                                required="required"
                                className="text-sky-800 w-1/3 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                            <input
                                type="text"
                                id="matricula3"
                                name="matricula3"
                                value={matricula3}
                                onChange={(e) => setMatricula3(e.target.value)}
                                required="required"
                                className="text-sky-800 w-1/3 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </div>
                    </label>

                    <div className="flex space-x-2 mt-6">
                        <button
                            type="submit"
                            className="w-24 bg-sky-600 text-white font-bold hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline">
                            Agregar
                        </button>
                        <button
                            type="button"
                            className="w-24 bg-red-300 text-white font-bold hover:bg-gray-700 py-1 rounded focus:outline-none focus:shadow-outline"
                            onClick={cancelCerrar}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OfertaMatricula;

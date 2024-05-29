import React, {useContext, useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {RolContext} from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png'; // Asegúrate de que esta ruta sea correcta
import bgImage from '../IMAGES/bg.Data-Wave.png';
import OfertaMatricula from './OfertaMatricula'; // Importa el componente CargaMatricula

const Secretario = () => {
    const rol = useContext(RolContext);
    const navigate = useNavigate();
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [mainComponent, setMainComponent] = useState(null);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleOfertaMatriculaClick = () => {
        setMainComponent(<OfertaMatricula/>);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 3000); // 3000 ms = 3 seconds

        return() => clearTimeout(timer); // Cleanup the timer
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
    };
    const toggleReportesMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        setShowLogoutConfirm(false);
    };

    const buttonClass = "bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outl" +
            "ine-none focus:shadow-outline text-center block w-full mb-3 h-12";
    const buttonClassCierre = "bg-green-300 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:ou" +
            "tline-none focus:shadow-outline text-center block w-full mb-3 h-12";
    const buttonClassCancelar = "bg-red-300 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outl" +
            "ine-none focus:shadow-outline text-center block w-full mb-3 h-12";

    return (
        <div className="flex h-screen">
            <div
                className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center justify-start h-screen">
                <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-28 rounded-full border-4 border-gray-400"/>
                </div>

                <button onClick={toggleReportesMenu} className={buttonClass}>
                    REPORTES
                </button>
                {
                    reportesMenuOpen && (
                        <div
                            className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-3">
                            <Link
                                to="/instituto/lista/"
                                className="block px-4 py-2 text-sm hover:bg-gray-700">
                                LISTADO DE INSTITUTOS
                            </Link>
                            <Link
                                to="/secretario"
                                className="block px-4 py-2 text-sm hover:bg-gray-700">
                                EGRESADOS
                            </Link>
                        </div>
                    )
                }

                <button
                    onClick={handleOfertaMatriculaClick}
                    className={buttonClass}
                    type="button">
                    MATRICULA
                </button>
                {
                    reportesMenuOpen && (
                        <div
                            className="bg-sky-800 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-3">
                            <Link
                                to="/instituto/lista/"
                                className="block px-4 py-2 text-sm hover:bg-gray-700">
                                LISTADO DE INSTITUTOS
                            </Link>
                            <Link
                                to="/inspector/editar-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-700">
                                EGRESADOS
                            </Link>
                        </div>
                    )
                }

                <div className="w-full">
                    <button
                        className={`${buttonClass} bg-gray-300 text-gray-800`}
                        type="button"
                        onClick={handleLogout}>
                        CERRAR SESIÓN
                    </button>
                </div>

                {
                    showLogoutConfirm && (
                        <div
                            className=" text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-3">
                            <button
                                className={`${buttonClassCierre} block px-4 py-2 text-sm hover:bg-gray-700 mb-1`}
                                onClick={logout}>
                                CONFIRMAR
                            </button>
                            <button
                                className={`${buttonClassCancelar} block px-4 py-2 text-sm hover:bg-gray-700`}
                                onClick={cancelLogout}>
                                CANCELAR
                            </button>
                        </div>
                    )
                }

            </div>

            <div
                className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                {
                    showWelcomeMessage && (
                        <div className="flex flex-col justify-center items-center h-full">
                            <img
                                src={logo}
                                alt="Data Wave Logo"
                                className="h-48 w-auto rounded-full border-4 border-gray-400 mb-5"/>
                            <p
                                className="font-arial text-4xl font-bold text-blue-800 mb-5 transition-opacity duration-4000 ease-in-out opacity-100">
                                {
                                    rol === 'inspector'
                                        ? 'Bienvenido Inspector'
                                        : 'Bienvenido'
                                }
                            </p>
                        </div>
                    )
                }
                {mainComponent}
            </div>
        </div>
    );
};

export default Secretario;
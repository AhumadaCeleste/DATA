import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png';
import bgImage from '../IMAGES/bg.Data-Wave.png';


const Inspector = () => {
    const rol = useContext(RolContext);
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [ofertasMenuOpen, setOfertasMenuOpen] = useState(false);
    const [consultasMenuOpen, setConsultasMenuOpen] = useState(false);
    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const { institutoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
        setOfertasMenuOpen(false);
        setConsultasMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
        setInstitutosMenuOpen(false);
        setConsultasMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const toggleConsultasMenu = () => {
        setConsultasMenuOpen(!consultasMenuOpen);
        setInstitutosMenuOpen(false);
        setOfertasMenuOpen(false);
        setReportesMenuOpen(false);
    };

    const toggleReportesMenu = () => {
        setReportesMenuOpen(!reportesMenuOpen);
        setInstitutosMenuOpen(false);
        setOfertasMenuOpen(false);
        setConsultasMenuOpen(false);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center min-h-screen">
                <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-15 w-28 object-cover rounded-full border-4 border-gray-400 sm:h-25 sm:w-25"
                    />
                </div>
                <div className="flex flex-col items-center flex-1">
                    <button
                        onClick={toggleInstitutosMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        INSTITUTOS
                    </button>
                    {institutosMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/crear-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                CREAR INSTITUTO
                            </Link>
                            <Link
                                to="/inspector/instituto/editar"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                GESTIONAR INSTITUTO
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleOfertasMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        OFERTAS
                    </button>
                    {ofertasMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/crear-oferta"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                CREAR OFERTA
                            </Link>
                            <Link
                                to="/inspector/gestionar-oferta"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                GESTIONAR OFERTA
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleConsultasMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        CONSULTAS
                    </button>
                    {consultasMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/instituto/lista"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                INSTITUTOS
                            </Link>
                            <Link
                                to="/inspector/consulta-oferta"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                OFERTAS
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleReportesMenu}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        REPORTES
                    </button>
                    {reportesMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <Link
                                to="/inspector/instituto/oferta-por-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                OFERTA POR INSTITUTO
                            </Link>
                            <Link
                                to="/inspector/egresados"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                EGRESADOS
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-sky-800 hover:bg-gray-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        CERRAR SESION
                    </button>
                    {showLogoutConfirm && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4 sm:text-sm md:text-base lg:text-lg xl:text-xl">
                            <button
                                className="bg-sky-400 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-white font-bold rounded-t focus:outline-none focus:shadow-outline sm:text-xs md:text-sm lg:text-base xl:text-lg"
                                onClick={logout}
                            >
                                CONFIRMAR
                            </button>
                            <button
                                className="bg-gray-400 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-white font-bold rounded-b focus:outline-none focus:shadow-outline sm:text-xs md:text-sm lg:text-base xl:text-lg"
                                onClick={cancelLogout}
                            >
                                CANCELAR
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative min-h-screen overflow-y-auto"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {showWelcomeMessage && (
                    <div className="flex flex-col justify-center items-center h-full">
                        <img
                            src={logo}
                            alt="Data Wave Logo"
                            className="h-48 w-auto rounded-full border-4 border-gray-400 mb-5"
                        />
                        <p className="font-arial text-4xl font-bold text-blue-700 mb-5 transition-opacity duration-4000 ease-in-out opacity-100">
                            {rol === 'inspector' ? 'Bienvenido Inspector' : 'Bienvenido'}
                        </p>
                    </div>
                )}
                <Outlet />
            </div>
        </div>
    );
};

export default Inspector;
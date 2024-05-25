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
    };

    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
    };

    const toggleConsultasMenu = () => {
        setConsultasMenuOpen(!consultasMenuOpen);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
        setShowLogoutConfirm(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center min-h-screen">
                <div className="bg-gray-800 rounded-full p-1 shadow-md mb-4">
                    <img
                        src={logo}
                        alt="Data Wave Logo"
                        className="h-28 rounded-full border-4 border-gray-400"
                    />
                </div>
                <div className="flex flex-col items-center flex-1">
                    <button
                        onClick={toggleInstitutosMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                    >
                        INSTITUTOS
                    </button>
                    {institutosMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                            <Link
                                to="/inspector/crear-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                CREAR INSTITUTO
                            </Link>
                            <Link
                                to="/inspector/editar-instituto"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                MODIFICAR INSTITUTO
                            </Link>
                        </div>
                    )}

                    <button
                        onClick={toggleOfertasMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                    >
                        OFERTAS
                    </button>
                    {ofertasMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
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
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                    >
                        CONSULTAS
                    </button>
                    {consultasMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                            <Link
                                to="/inspector/instituto-lista"
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
                            <Link
                                to="/inspector/consulta-egresados"
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                EGRESADOS
                            </Link>
                            <Link
                                to={`/inspector/instituto/${institutoId}/ofertas`}
                                className="block px-4 py-2 text-sm hover:bg-gray-700"
                            >
                                OFERTAS POR INSTITUTO
                            </Link>
                        </div>
                    )}

                    <button
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full"
                        type="button"
                        onClick={handleLogout}
                    >
                        CERRAR SESION
                    </button>
                </div>
            </div>

            {showLogoutConfirm && (
                <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
                    <button
                        className="border-2 bg- rounded-lg border-gray-300 py-3 titulo_tarjetas m-4 hover:bg-sky-700 text-sm md:text-base"
                        onClick={logout}
                    >
                        ¿Confirmas el cierre de sesión?
                    </button>
                </div>
            )}

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
                        <p
                            className="font-arial text-4xl font-bold text-blue-700 mb-5 transition-opacity duration-4000 ease-in-out opacity-100"
                        >
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
import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';

const Inspector = () => {
    const rol = useContext(RolContext);
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [ofertasMenuOpen, setOfertasMenuOpen] = useState(false);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
    };

    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 h-5"></div>
            <div className="flex flex-1">

                <div className="flex-none w-1/4 bg-gray-800 p-2 rounded-r-3 flex flex-col justify-center items-center">
                    <button
                        onClick={toggleInstitutosMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mb-8 text-center block w-full"
                    >
                        INSTITUTOS
                    </button>
                    {institutosMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline mb-8 text-center block w-full">
                            <Link to="/inspector/crear-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">CREAR INSTITUTO</Link>
                            <Link to="/inspector/editar-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">MODIFICAR INSTITUTO</Link>
                        </div>
                    )}

                    <button
                        onClick={toggleOfertasMenu}
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mb-10 text-center block w-full"
                    >
                        OFERTAS
                    </button>
                    {ofertasMenuOpen && (
                        <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline mb-10 text-center block w-full">
                            <Link to="/inspector/crear-oferta" className="block px-4 py-2 text-sm hover:bg-gray-700">CREAR OFERTA</Link>
                            <Link to="/inspector/gestionar-oferta" className="block px-4 py-2 text-sm hover:bg-gray-700">GESTIONAR OFERTA</Link>
                        </div>
                    )}

                    <Link
                        to="/inspector/cohortes"
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mb-10 text-center block w-full"
                    >
                        COHORTES
                    </Link>
                    <button
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mb-10 text-center block w-full"
                        type="button"
                    >
                        CERRAR SESION
                    </button>
                </div>
                <div className="flex-1 bg-gray-300 flex flex-col justify-center items-center h-100">
                    {rol === 'inspector' ? (
                        <p>Bienvenido Inspector</p>
                    ) : (
                        <p>No tienes permiso para acceder a esta página</p>
                    )}
                    {/* Aquí se mostrará el contenido de CrearInstituto */}
                    <Outlet />
                </div>
            </div>
            <div className="bg-gray-800 h-10"></div>
        </div>
    );
};

export default Inspector;
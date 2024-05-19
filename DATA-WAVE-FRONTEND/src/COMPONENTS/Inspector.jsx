import React, { useContext, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';
import logo from '../IMAGES/Logo Data-wave.png'; // Asegúrate de que esta ruta sea correcta
import bgImage from '../IMAGES/bg.Data-Wave.png';

const Inspector = () => {
    const rol = useContext(RolContext);
    const [institutosMenuOpen, setInstitutosMenuOpen] = useState(false);
    const [ofertasMenuOpen, setOfertasMenuOpen] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 3000); // 3000 ms = 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    const toggleInstitutosMenu = () => {
        setInstitutosMenuOpen(!institutosMenuOpen);
    };

    const toggleOfertasMenu = () => {
        setOfertasMenuOpen(!ofertasMenuOpen);
    };

    const [reportesMenuOpen, setReportesMenuOpen] = useState(false);

    const toggleReportesMenu = () => {
        setReportesMenuOpen(!reportesMenuOpen);
    };

    return (
        <div className="flex h-screen">
            <div className="flex-none w-1/5 bg-gray-800 p-4 flex flex-col items-center justify-center h-screen">
            <div className="absolute top-5 left-[93px] z-50 bg-gray-800 rounded-full p-1 shadow-md">
            <div className="relative">
  <img 
    src={logo} 
    alt="Data Wave Logo" 
    className="h-28 rounded-full border-4 border-gray-400 lg:relative lg:left-[-0.95cm] mt-"
  />
</div>
                </div>
                <button
                    onClick={toggleInstitutosMenu}
                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                >
                    INSTITUTOS
                </button>
                {institutosMenuOpen && (
                    <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                        <Link to="/inspector/crear-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">CREAR INSTITUTO</Link>
                        <Link to="/inspector/editar-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">MODIFICAR INSTITUTO</Link>
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
                        <Link to="/inspector/crear-oferta" className="block px-4 py-2 text-sm hover:bg-gray-700">CREAR OFERTA</Link>
                        <Link to="/inspector/gestionar-oferta" className="block px-4 py-2 text-sm hover:bg-gray-700">GESTIONAR OFERTA</Link>
                    </div>
                )}

                <Link
                    to="/inspector/cohortes"
                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                >
                    COHORTES
                </Link>

                <button
                    onClick={toggleReportesMenu}
                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4"
                >
                    REPORTES
                </button>
                {reportesMenuOpen && (
                    <div className="bg-sky-600 text-white font-bold rounded focus:outline-none focus:shadow-outline text-center block w-full mb-4">
                        <Link to="/instituto/lista/" className="block px-4 py-2 text-sm hover:bg-gray-700">LISTADO DE INSTITUTOS</Link>
                        <Link to="/inspector/editar-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">MATRICULAS</Link>
                        <Link to="/inspector/editar-instituto" className="block px-4 py-2 text-sm hover:bg-gray-700">EGRESADOS</Link>
                    </div>
                )}

                <button
                    className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline text-center block w-full"
                    type="button"
                >
                    CERRAR SESION
                </button>
            </div>

            <div className="flex flex-col justify-center items-center flex-1 bg-gray-300 relative" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                
                {showWelcomeMessage && (
                    <div className="flex flex-col justify-center items-center h-full">
                        <img src={logo} alt="Data Wave Logo" className="h-48 w-auto rounded-full border-4 border-gray-400 mb-5" />
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
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';

const Inspector = () => {
    const rol = useContext(RolContext);

    return (
        <div className="flex flex-col">
            <div className="bg-gray-800 h-16"></div>
            <div className="flex flex-1">
                <div className="flex-none w-1/4 bg-gray-800 p-2 rounded-r-3 flex flex-col justify-center items-center">
                    <Link to="/inspector/crear-instituto" className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">
                        CREAR INSTITUTO
                    </Link>
                    <Link to="/instituto/actualizar" className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">
                        MODIFICAR INSTITUTO
                    </Link>
                    <button
                        className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Iniciar sesión
                    </button>
                </div>
                <div className="flex-1 bg-gray-300 flex flex-col justify-center items-center">
                    <div className="bg-gray-200 h-auto p-8">
                        {
                            rol === 'inspector'
                                ? <p>Bienvenido Inspector</p>
                                : <p>No tienes permiso para acceder a esta página</p>
                        }
                        {/* Aquí se mostrará el contenido de CrearInstituto */}
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 h-16"></div>
        </div>
    );
};

export default Inspector;
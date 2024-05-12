import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RolContext } from '../CONTEXT/RolContext';

const Director = () => {
    const rol = useContext(RolContext);

    return (
        <div className="flex h-screen">
            <div className="flex-none w-1/5 bg-gray-800 p-4">
                <Link to="/inspector/crear-instituto" className="block text-white text-left mb-2">Crear Instituto</Link>
                <button className="block text-white text-left">Modificar Instituto</button>
            </div>
            <div className="flex-grow bg-gray-200 p-4">
                <div className="rounded bg-white p-4">
                    <h1 className="text-2xl font-bold mb-4">Página de Director</h1>
                    {rol === 'director' ? <p>Bienvenido Director</p> : <p>No tienes permiso para acceder a esta página</p>}
                </div>
            </div>
        </div>
    );
};

export default Director;
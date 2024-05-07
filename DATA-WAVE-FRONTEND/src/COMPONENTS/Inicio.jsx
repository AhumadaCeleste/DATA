import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Inicio = ({ setIsLoggedIn }) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí deberías validar el DNI y la contraseña antes de establecer isLoggedIn en true
    setIsLoggedIn(true);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className="border-2 rounded-lg p-2 m-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 rounded-lg p-2 m-2"
        />
        <button type="submit" className="bg-sky-700 text-white px-4 py-2 rounded-lg m-2">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Inicio;
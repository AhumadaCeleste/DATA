
import React, { createContext, useState } from 'react';

// Contexto para compartir información entre componentes
export const RolContext = createContext(null);

// Proveedor de RolContext que recibe a todos los componentes hijos
export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState([]);

  return (
    <RolContext.Provider value={[rol, setRol]}>
      {children}
    </RolContext.Provider>
  );
};


/*
import React, {createContext, useContext, useState} from 'react';

const RolContext = createContext();

export const useRol = () => useContext(RolContext);

export const RolProvider = ({children}) => {
    const [rol, setRol] = useState('secretario');
    return (
        <RolContext.Provider
            value={{
                rol,
                setRol
            }}>
            {children}
        </RolContext.Provider>
    );
};
*/

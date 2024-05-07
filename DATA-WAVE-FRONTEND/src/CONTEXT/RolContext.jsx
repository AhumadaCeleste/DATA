import React, { createContext, useState } from "react";
//contex, comparte informacion entre componentes

// props en Null?
export const RolContext = createContext(null);
    // se le asigna el nombre //aqui se crea el contex 

    //se puede pasar (props) o (children) es lo mismo
export const Rolcontext = ({ children }) => {
// Carrito provaider recibe a todos los componentes hijos
  const [rol, setRol] = useState([]);


  return (
    <Rolcontext.Provider value={[rol, setRol]}>
      {children}
    </Rolcontext.Provider>
  );
};
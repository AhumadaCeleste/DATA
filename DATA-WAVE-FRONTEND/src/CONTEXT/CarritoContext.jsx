import React, { createContext, useState } from "react";
//contex, comparte informacion entre componentes

// props en Null?
export const CarritoContext = createContext(null);
    // se le asigna el nombre //aqui se crea el contex 

    //se puede pasar (props) o (children) es lo mismo
export const CarritoProvider = ({ children }) => {
// Carrito provaider recibe a todos los componentes hijos
  const [carro, setCarro] = useState([]);


  return (
    <CarritoContext.Provider value={[carro, setCarro]}>
      {children}
    </CarritoContext.Provider>
  );
};
//Value asigna valor, Carro, SetCarro Es la infomacion que se imparte entre 
//todos los componentes
//Children significa que la informacion se imparte a todos los componentes 
//que encierra Carrito provider en App
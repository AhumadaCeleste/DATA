/*
SEGUIR
import React, { useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Alta de categoria
function CrearOferta() {
  // Define estados para los campos del formulario
  const [resolucion, setResolucion] = useState("");
  const [infonombre, setInfonobre] = useState("");
  const [sector, setSector] = useState("");
  const [descripcion, setDescripcion] = useState("");
  //aui necesito codigo de una ventana desplegable que consulte a la base de datos la tabla "cohorte" y muestre cohortes


  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del mensaje
    const NuevaOferta = {
      resolucion,
      nombre,
      sector,
      descripcion,
      //Aqui debe incoorporar la cohorte que selecciono el usuario
    };
    try {
      // Realiza una petición POST al backend para guardar el mensaje
      const res = await axios.post("http://localhost:3001/producto/nuevo", NuevoProducto);
      console.log(res);
      alert("Producto Agregado");

    } catch (error) {
      alert(`Error tipo: ${error.response.data.msg}`);
      // Maneja cualquier error que ocurra durante la solicitud
      console.log("Error al enviar el mensaje al back:", error);
    }
  };

  return (
    <div className="bg-primary py-16 px-16 rounded-md w-auto m-8">
      <div className="contactar-container">
        <h2 className="titulo_pricipal_paginas mb-4 mt-0 shadow-lg text-center">Crear Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="infoproducto" className="block mb-2">PRESENTACION EN GR. ML, C.C.</label>
            <input
              type="text"
              id="infoproducto"
              name="infoproducto"
              value={infoproducto}
              onChange={(e) => setInfoproducto(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="precio" className="block mb-2">Precio</label>
            <input
              type="text"
              id="precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="preciooferta" className="block mb-2">Precio total con descuento:</label>
            <input
              type="text"
              id="preciooferta"
              name="preciooferta"
              value={preciooferta}
              onChange={(e) => setPreciooferta(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div> 

          <div className="mb-4">
            <label htmlFor="esoferta" className="block mb-2">Es oferta:1, No es oferta:0</label>
            <input
              type="text"
              id="esoferta"
              name="esoferta"
              value={esoferta}
              onChange={(e) => setEsoferta(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div> 
        
          <div className="mb-4">
            <label htmlFor="imgUrl" className="block mb-2">IMAGEN</label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgurl(e.target.value)}
              required
              className="w-full py-3 px-4 border rounded-lg shadow-md focus:outline-none"
            />
          </div> 

          <button type="submit" className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            AGREGAR
          </button>

        <Link to={`/logout`}>   
        <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
         CERRAR SESION
        </button>
          </Link>

          <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
            <Link to="/usuario">MENU</Link>
          </button>

        </form>
      </div>
    </div>
  );
}

export default AltaProducto;
*/
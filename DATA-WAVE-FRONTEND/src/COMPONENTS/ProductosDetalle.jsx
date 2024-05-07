import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";



function ProductoDetalle() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/producto/lista")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de productos:", error);
      });
  }, []);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div className="bg-primary p-8 rounded-lg shadow-lg text-center" style={{ marginTop: '25px' }}>
      <h2 className="mb-4 text-2xl font-semibold">{product.nombre}</h2>
      <div className="mt-16 flex justify-center items-center">
        <img
          src={img}
          alt="Imagen del producto"
          style={{ width: '320px', height: '320px', marginTop: '-48px' }}
        />
      </div>
      <p className="mt-8">{product.description}</p>
      <p>Precio ${product.precio} url:{product.imgUrl} </p>
      <p>Unicamente por hoy...</p>
      <p className="font-bold">Precio Oferta ${product.preciooferta}</p>

      <div className="botones_DetProducto text-xs">
        <div style={{ display: "flex" }}>
          <button className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4 text-sm">
            <Link to="/compra">Regresar</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
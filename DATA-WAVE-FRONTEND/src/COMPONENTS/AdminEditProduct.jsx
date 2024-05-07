import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminEditProduct(props) {
  const [producto, setProducto] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [newProductoName, setNewProductoName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducto, setFilteredProducto] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    loadProducto();
  }, []);

  const loadProducto = (isSearch = false) => {
    if (!isSearch) {
      axios.get("http://localhost:3001/producto/lista")
        .then((response) => {
          setProducto(response.data);
          setFilteredProducto(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de producto:", error);
        });
    } else {
      const search = document.getElementById("searchQuery").value;
      const filtered = producto.filter((producto) =>
        producto.nombre.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducto(filtered);
    }
  };

  const editProducto = (productoId) => {
    const productoToEdit = producto.find((producto) => producto.id === productoId);
    if (productoToEdit) {
      setSelectedProducto(productoToEdit);
      setNewProductoName(productoToEdit.nombre);
    }
  };

  const cancelEdit = () => {
    setSelectedProducto(null);
    setNewProductoName("");
  };

  const confirmEdit = () => {
    axios
      .put(`http://localhost:3001/producto/actualizar/${selectedProducto.id}`, {
        nombre: newProductoName,
      })
      .then((response) => {
        setSelectedProducto(null);
        setNewProductoName("");
        loadProducto();
      })
      .catch((error) => {
        console.error("Error al actualizar la producto:", error);
      });
    console.log("Producto editada", "El producto ha sido editada correctamente", "success");
  }

  const deleteProducto = (productoId) => {
    axios
      .delete(`http://localhost:3001/producto/eliminar/${productoId}`)
      .then((response) => {
        loadProducto();
        setSelectedProducto(null);
        setNewProductoName("");
        console.log("Producto eliminado", "El producto ha sido eliminada correctamente", "success");
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  return (
    <div className="min-h-screen p-23">
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Edición de Productos</h2>
  
        <div className="flex justify-between items-center">
          <h3 className="max-w-xs">

            {filteredProducto.nombre}
          </h3>
          <div className="rounded-md max-w-xs">
            <input
              id="searchQuery"
              className="border-2 border-primary rounded-md w-[380px] h-[50px]"
              placeholder="Buscar producto"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                loadProducto(true);
              }}
            />
          </div>
          <div className="ml-auto">
            <Link to="/altaproducto">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4">
                Crear producto
              </button>
            </Link>
          </div>
        </div>
  
        {selectedProducto ? (
          <div className="mt-4 rounded-md max-w-xl">
            <h3 className="text-xl font-bold mb-2 cursor-pointer">
              Editar Producto: {selectedProducto.nombre}
            </h3>
            <input
              ref={inputRef}
              autoFocus={true}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full bg-primary"
              type="text"
              value={newProductoName}
              onChange={(e) => setNewProductoName(e.target.value)}
            />
            <button
              className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
              onClick={confirmEdit}
            >
              Confirmar
            </button>
            <button
              className="bg-primary rgb(100, 193, 218) cursor-pointer p-3 m-2 rounded-md"
              onClick={cancelEdit}
            >
              Cancelar
            </button>
          </div>
        ) : null}
  
        <ul className="mt-4">
          {filteredProducto.map((producto) => (
            <div
              className="shadow-lg rounded-lg p-6 bg-primary mb-4 flex justify-between items-center h-20"
              key={producto.id}
            >
              <input
                className="text-left align-middle w-1/2 p-2 mr-2 bg-primary font-bold"
                readOnly={true}
                type="text"
                value={producto.nombre}
              />
              <div className="flex items-center space-x-4">
                <button
                  className="border-2 rounded-lg border-blue-300 h-10 w-20 text-sm bg-blue-300 text-white"
                  onClick={() => editProducto(producto.id)}
                >
                  Editar
                </button>
                <button
                  className="border-2 rounded-lg border-red-300 h-10 w-20 text-sm bg-red-300 text-white"
                  onClick={() => deleteProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </ul>
  
        <div className="flex justify-between mt-4">
          <Link to="/ModCategoria">
            <button className="border border-blue-300 text-blue-300 p-2 rounded-md">
              ABM
            </button>
          </Link>
          <Link to="/logout">
            <button className=" bg-primary hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
              Cerrar sesión
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProduct;
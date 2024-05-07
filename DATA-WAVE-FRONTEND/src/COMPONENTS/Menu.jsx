import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../CONTEXT/CarritoContext';



import Logo from '../IMAGES/logoOk.jpg';

function Menu(props) {
  const { authOK, authOKCli } = props;

  // Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Estado para controlar la visibilidad de los menús desplegables
  const [isClienteMenuOpen, setIsClienteMenuOpen] = useState(false);
  const [isUsuarioMenuOpen, setIsUsuarioMenuOpen] = useState(false);
  const [isCategoriaMenuOpen, setIsCategoriaMenuOpen] = useState(false);

  const toggleClienteMenu = () => {
    setIsClienteMenuOpen(!isClienteMenuOpen);
  };

  const toggleUsuarioMenu = () => {
    setIsUsuarioMenuOpen(!isUsuarioMenuOpen);
  };

  const toggleCategoriaMenu = () => {
    setIsCategoriaMenuOpen(!isCategoriaMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsClienteMenuOpen(false);
    setIsUsuarioMenuOpen(false);
    setIsCategoriaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const [carro] = useContext(CarritoContext);

  const V_cantidad = carro.reduce((acc, curr) => {
    return acc + curr.cantidad;
  }, 0);

  return (
    <div className=''>
      <div
        className={`${
          authOKCli ? 'bg-sky-700' : authOK ? 'bg-indigo-50' : 'bg-primary'
        } container-2xl mx-auto w-full p-1 rounded-lg md:space-x-4`}
        style={{ marginTop: '-40px', height: 'auto' }}
      >
        <div className='flex items-center justify-between md:space-x-20 logomenu'>
          <div className='flex items-center m-4 mb-1'>
            <img src={Logo} alt='logo' className='rounded-full mb-2' />
          </div>
          

          <ul className={`md:flex md:space-x-4 w-full ${isMobileMenuOpen ? 'flex-col' : 'hidden'}`}>
            <div
              className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                authOKCli || authOK ? 'hover:bg-sky-700' : 'hover-bg-sky-700'
              }`}

              onClick={closeMobileMenu}
            >
              <span className='menu-item hover:bg-sky-700'>
                <Link to='/'>Home</Link>
              </span>
            </div>

  

            <div
              className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                authOKCli || authOK ? 'hover:bg-sky-700' : 'hover-bg-sky-700'
              }`}
              onClick={closeMobileMenu}
            >
              <span className='menu-item hover:bg-sky-700'>
                <Link to='/rutinas'>Rutinas</Link>
              </span>
            </div>

            <div
              className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                authOKCli || authOK ? 'hover:bg-sky-700' : 'SolyNacho2'
              }`}
            >
              <span className='menu-item hover:bg-sky-700'>
                <Link to='/compra'>Productos</Link>
              </span>
            </div>

            <div
              className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                authOKCli || authOK ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
              }`}
              onClick={closeMobileMenu}
            >
              <span className='menu-item'>
                <Link to='/categoria'>Categorías</Link>
              </span>
            </div>

            <div
              className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
                authOKCli || authOK ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
              }`}
              onClick={closeMobileMenu}
            >
              <span className='menu-item hover:bg-sky-700'>
                <Link to='/oferta'>Ofertas</Link>
              </span>
            </div>

            {/* Menú para Cliente */}
            {!authOK && (
              <div
                className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer ${
                  authOKCli ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
                }`}
                onClick={toggleClienteMenu}
              >
                <span className='menu-item'>
                  Cliente
                </span>
                {isClienteMenuOpen && (
                  <div className='m-1 p-1 space-y-2 border-t border-b  hover:bg-sky-700'>
                    {authOKCli ? (
                      <Link to='/logoutCli'>Cerrar sesión</Link>
                    ) : (
                      <>
                        <Link to='/cliente' className='register-link'>
                          Regístrese
                        </Link>
                        <br />
                        <Link to='/loginCli' className='login-link'>
                          Ingresar
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Menú para Usuario */}
            {!authOKCli && (
              <div
                className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer ${
                  authOK ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
                }`}
                onClick={toggleUsuarioMenu}
              >
                <span className='menu-item  hover:bg-sky-700'>
                  {authOK ? (
                    <Link to='/logout'>Cerrar sesión</Link>
                  ) : (
                    <Link to='/login'>Login Usuario</Link>
                  )}
                </span>
              </div>
            )}

            {/* Ver carrito si está logeado el cliente */}
            {authOKCli && (
  <div
    className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
      authOKCli || authOK ? 'hover-bg-sky-700' : 'hover-bg-sky-700'
    }`}
  >
    <div className='relative'>
      <span className='menu-item cursor-pointer' onClick={closeMobileMenu}>
        <Link to='/carrito'>Ver Carrito - Art: {V_cantidad} </Link>
      </span>
      <div className='absolute top-full left-0 mt-1 p-2 border-t border-b border-white bg-sky-700 text-sm'>
        <Link className='hover-bg-sky-700 hover-text-white text-sm px-1 py-1' to='/Cli'>
          Menu Cliente
        </Link>
      </div>
    </div>
  </div>
)}

            {/* Menú para ABM Categorias si está logeado usuario */}
      {authOK && (
  <div
  className={`relative px-1 py-1 text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
    authOK ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
    }`}
    onClick={toggleCategoriaMenu}
  >
    <span className='menu-item ml-1' style={{ margin: '30px' }}>
  Administrador
</span>
    {isCategoriaMenuOpen && authOK && (
      <div className='absolute top-full left-0 mt-1 p-2 border-t border-b border-white text-sm bg-indigo-50'>
        <Link className='hover:bg-sky-700 hover:text-white px-2 py-1' to='/usuario'>MENU</Link>
        <br />
        <Link className='hover:bg-sky-700 hover:text-white px-2 py-1' to='/ModCategoria'>Gestionar Categorias</Link>
        <br />
        <Link className='hover:bg-sky-700 hover:text-white px-2 py-1' to='/ACategoria'>Crear Categoria</Link>
        <br />
        <Link className='hover:bg-sky-700 hover:text-white px-2 py-1' to="/EditProdu">Gestionar Productos</Link>
        <br />
        <Link className='hover:bg-sky-700 hover:text-white px-2 py-1' to="/altaproducto">Crear producto</Link>
        <br />
      </div>
    )}
  </div>
)}

{/* Botón para cerrar el menú móvil */}
<div
  className={`px-1 py-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ${
    authOKCli || authOK ? 'hover:bg-sky-700' : 'hover:bg-sky-700'
  }`}
  onClick={closeMobileMenu}
></div>
          </ul>

          <div className='md:hidden ml-auto'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 focus:outline-none'
            >
              <div className='w-6 h-0.5 bg-white mb-1'></div>
              <div className='w-6 h-0.5 bg-white mb-1'></div>
              <div className='w-6 h-0.5 bg-white'></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
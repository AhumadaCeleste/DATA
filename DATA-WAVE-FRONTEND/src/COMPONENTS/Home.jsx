import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import img1 from "../IMAGES/A4 Reporte empresa corporativo azul (1).png";
import img2 from "../IMAGES/A4 Reporte empresa corporativo azul (1).png";
import img3 from "../IMAGES/A4 Reporte empresa corporativo azul (1).png";



  // video profe: "h-screen:text-size-1xl sm:text-3xl md:text-5xl xl:text-7xl

  const Home = () => {
    const images = [img1, img2, img3];
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
      <div className="relative mt-10 md:mt-28 h-screen/1 overflow-hidden p-12">
        <div className="md:mt-">
          <video autoPlay muted loop id="bgVideo">
            <source src="/videos/DATA-WAVE.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
  
          
  
          <div className="slider bienvenido p-5 login-form flex flex-col mt-2 md:flex-row">
            <div className="md:w-3/4 rounded-lg overflow-hidden">
              <Slider {...settings} className="marker:w-full h-full">
                {images.map((image, index) => (
                  <div key={index} className=" w-full h-full">
                    <Link to={`/`}>
                      <div className="slider max-w-sm mx-auto mt-3 overflow-hidden relative">
                        <img
                          src={image}
                          alt={`slide-${index}`}
                          className="rounded-10 w-full h-[300px] object-cover"
                          style={{ maxWidth: '100%' }}
                        />
                         
                        <div className="absolute top-0 left-0 right-0 text-center bg-primary text-white p-2">
                         
                         
                          <p className="text-sm">Ver Productos</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
            <button className="bg-sky-700 text-white px-8 py-2 rounded-lg m-2">
              <Link to="/instituto/nuevo">Crear Departamento</Link>
            </button>
            <button className="bg-sky-700 text-white px-8 py-2 rounded-lg m-2">
              <Link to="/departamento/actualizar">Gestion de departamentos</Link>
            </button>
            <button className="bg-sky-700 text-white px-8 py-2 rounded-lg m-2">
              <Link to="/instituto/nuevo">Crear Instituto</Link>
            </button>
            <button className="bg-sky-700 text-white px-8 py-2 rounded-lg m-2">
              <Link to="/instituto/nuevo">Gestión de Institutos</Link>
            </button>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
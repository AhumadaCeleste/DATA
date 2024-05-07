import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import img1 from '../IMAGES/Bruma.jpg';
import img2 from '../IMAGES/CremaCorporal.png';
import img3 from '../IMAGES/antiage.jpg';
import img4 from '../IMAGES/desodorante.png';
import img5 from '../IMAGES/corporalchica.png';


  // video profe: "h-screen:text-size-1xl sm:text-3xl md:text-5xl xl:text-7xl

const Home = () => {
  const images = [img1, img2, img3, img4, img5];

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
    <div className="relative mt-10 md:mt-1 h-screen/2 overflow-hidden">
      <div className="md:mt-2">
        <h2 className="TituloHome text-center mb-4">
          <div className='text-5xl font-bold'>SciELO</div>
          <div className='text-2xl'>Cosmetica Natural Artesanal</div>
        </h2>
        <h1 className="bg-primary p-8 mt-2 rounded-lg shadow-lg text-center w-3/4 mx-auto">
          Descubre la belleza que la naturaleza tiene para ofrecerte. En Scielo, nos dedicamos a crear productos
          de cosmética natural y artesanal, formulados con ingredientes puros y sostenibles para el cuidado de tu piel.
          Nuestra pasión es brindarte una experiencia única, donde la naturaleza y la belleza se encuentran.
        </h1>
      </div>

    N<div className="m-4">
      <button  className=" bg-red-200 hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
      <Link to={`/cuponesABM`}>
         EDITAR CUPON
       </Link>
      </button>

     

      <button  className=" bg-red-200 hover:text-primary cursor-pointer p-3 m-2 max-w-xs border-2 rounded-lg">
      <Link to={`/cupones`}>
         CREAR CUPON
       </Link>
      </button>
    </div>

      <div className="flex flex-col mt-2 md:flex-row">
  <div className="md:w-3/4">
    <Slider {...settings} className="w-full h-full">
      {images.map((image, index) => (
        <div key={index} className="w-full h-full">
          <Link to={`/compra`}>
            <div className="max-w-sm mx-auto mt-3 overflow-hidden relative">
              <img
                src={image}
                alt={`slide-${index}`}
                className="w-full h-[300px] object-cover"
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
  <div className="bg-blue-50 p-4 mt-2 rounded-lg shadow-lg text-center md:w-1/ md:max-w-2xl md:mx-auto h-auto md:h-45 m-2">
  <h3 className="text-xl font-bold mb-2">Rutinas destacadas!!</h3>
  <br></br>

  <ul className="md:flex md:flex-col md:space-y-2">
    <li className="md:inline-block mb-2 md:mb-0">
      <Link to="/rutinas/info/1">LIMPIEZA E HIDRATACION PARA ROSTRO GRASO - ACNEICA</Link>
    </li>
    <br></br>
    <li className="md:inline-block mb-2 md:mb-0">
      <Link to="/rutinas/info/2">HUMECTACION POST DUCHA</Link>
    </li>
    <br></br>
    <li className="md:inline-block">
      <Link to="/rutinas/info/3">TRATAMIENTO ANTI-MANCHAS</Link>
    </li>
  </ul>
    </div>
      </div>
    </div>
  );
};

export default Home;
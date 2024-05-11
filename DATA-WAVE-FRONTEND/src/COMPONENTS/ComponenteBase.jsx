import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';



  // video profe: "h-screen:text-size-1xl sm:text-3xl md:text-5xl xl:text-7xl

const Home = () => {
  
  return (
    <div className="relative mt-10 md:mt-28 h-screen/1 overflow-hidden p-8">
      <div className="md:mt-">
      <video autoPlay muted loop id="bgVideo">
        <source src="/videos/DATA-WAVE.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      
        <h1 className="bienvenido p-5 login-form">
          Bienvenido!
        </h1>
      </div>
      </div>
  );
};

export default Home;


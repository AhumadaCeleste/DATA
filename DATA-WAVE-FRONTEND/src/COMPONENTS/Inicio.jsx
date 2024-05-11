import React from "react";
import backgroundImage from "../IMAGES/Equipo.jpg";

const Inicio = () => {
    return (
        <div
            style={{
                backgroundColor: 'rgb(209, 221, 221)'
            }}>
            <div className='container-fluid'>

                <div className="text-center"></div>

                {/* Formulario Login */}
                <div className="row justify-content-center">
                    <div
                        className="col-md-12 d-flex justify-content-end align-items-center"
                        style={{
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '50px',
                            borderRadius: '10px',
                            height: "500px"
                        }}>
                        <div
                            className="bg-color shadow-md rounded px-10 pt-6 pb-8 mb-8 mt-5"
                            style={{
                                maxWidth: '600px'
                            }}>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                    Usuario
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="D.N.I"/>
                            </div>
                            <div className="mb-6">
                                <label className="block  text-white text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"/>
                                <p className="text-red-500 text-xs italic">Por favor, ingrese una contraseña.</p>
                            </div>
                            <div className="flex flex-row justify-between p-1">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    type="button">
                                    Iniciar sesión
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                                    type="button">
                                    Solicitar Usuario
                                </button>
                            </div>
                            <br/>
                            <br/>
                            <div className="mt-4">
                                <a
                                    className="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800"
                                    href="#">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <br/> {/*Cards* */}
                <div className="row">
                    <div className="col-md-4">
                        <div className="p-2 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                className="bi bi-file-earmark-text"
                                viewBox="0 0 16 16">
                                <path
                                    d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                                <path
                                    d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                            </svg>
                            <h1>Reportes Personalizados</h1>
                            <p>
                                Genera informes detallados y personalizados para analizar el desempeño
                                académico, la asistencia y otros aspectos clave de tu institución educativa. Con
                                nuestra herramienta de reportes, puedes visualizar datos de manera efectiva y
                                tomar decisiones fundamentadas para mejorar la calidad educativa.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-2 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                className="bi bi-person-workspace"
                                viewBox="0 0 16 16">
                                <path
                                    fillRule="evenodd"
                                    d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                                <path
                                    fillRule="evenodd"
                                    d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                            </svg>
                            <h1>acceso desdes la nuve</h1>
                            <h1>Acceso desde la Nube</h1>
                            <p>
                                Accede a tus datos en cualquier momento y desde cualquier lugar con Data Wave.
                                Nuestra plataforma te permite acceder a la información de tu institución
                                educativa de forma segura y conveniente, directamente desde la nube.
                            </p>
                            <p>
                                Con la capacidad de acceder a tus datos desde la nube, puedes gestionar y
                                analizar la información de manera eficiente, sin importar dónde te encuentres.
                                Ya sea que estés en la escuela, en casa o en movimiento, siempre tendrás acceso
                                a los datos que necesitas.
                            </p>
                            <p>
                                Descubre cómo el acceso desde la nube en Data Wave puede mejorar la flexibilidad
                                y la accesibilidad de tus datos. Únete a nosotros y experimenta la conveniencia
                                de acceder a tus datos desde cualquier lugar.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-2 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                className="bi bi-cloud-arrow-down"
                                viewBox="0 0 16 16">
                                <path
                                    fillRule="evenodd"
                                    d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
                                <path
                                    d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                            </svg>
                            <h1>Carga de Datos Segura</h1>
                            <p>
                                En Data Wave, la seguridad de tus datos es nuestra prioridad. Nuestra plataforma
                                garantiza una carga de datos segura y fiable, protegiendo la información
                                sensible de tu institución educativa.
                            </p>
                            <p>
                                Utilizamos las últimas tecnologías de seguridad para garantizar que tus datos
                                estén protegidos en todo momento. Además, ofrecemos opciones de cifrado y
                                autenticación avanzadas para asegurar la integridad de tus datos durante la
                                carga y almacenamiento.
                            </p>
                            <p>
                                Con Data Wave, puedes estar tranquilo sabiendo que tus datos están en buenas
                                manos. Nuestro enfoque en la seguridad de los datos garantiza que tu información
                                esté protegida contra amenazas externas y se mantenga confidencial en todo
                                momento.
                            </p>
                            <p>
                                Descubre cómo la carga de datos segura en Data Wave puede ayudarte a proteger y
                                gestionar tus datos de manera eficiente y segura. Únete a nosotros y experimenta
                                la tranquilidad de saber que tus datos están protegidos.
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
            <div class="card">
  <div class="card-header">
    PORQUE NOS ELIGEN
  </div>
  <div class="card-body">
    <p class="card-text"><p>
  En Data Wave, nos eligen nuestros clientes por nuestra dedicación a la excelencia en la gestión educativa. Nuestra plataforma ofrece soluciones innovadoras y fiables que ayudan a las instituciones educativas a mejorar su eficiencia y rendimiento.
</p>
<p>
  Nuestros clientes valoran especialmente nuestra capacidad para proporcionar informes detallados y personalizados, así como para garantizar la seguridad y confidencialidad de sus datos. Además, nuestro enfoque en la accesibilidad y facilidad de uso nos ha convertido en la opción preferida para instituciones educativas de todo el mundo.
</p>
<p>
  Descubre por qué tantas instituciones educativas eligen Data Wave para gestionar sus datos y mejorar sus procesos educativos. Únete a nosotros y experimenta la diferencia que puede hacer Data Wave en tu institución.
</p></p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <h5 class="card-title">NUESTROS CLIENTES</h5>
</div>
        </div>
    );
}

export default Inicio;
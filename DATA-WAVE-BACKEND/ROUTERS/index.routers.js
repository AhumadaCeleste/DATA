module.exports = (app) => {

    const Auth = require('../MIDDLEWARES/Auth'); // Importa el módulo 'Auth'

    // Importa las rutas:
    const institutoRouters = require('./instituto.routers');
    const rolRouters = require('./rol.routers'); 
    const ciudadRouters = require('./ciudad.routers');
    const departamentoRouters = require('./departamento.routers');
    const permisoRouters = require('./permiso.routers'); 
    const ofertaRouters = require('./oferta.routers');
    const usuarioRouters = require('./usuario.routers');
    const cohorteRouters = require('./cohorte.routers');
    
    // Usa las rutas:
    app.use('/instituto', institutoRouters);
    app.use('/rol', rolRouters); 
    app.use('/ciudad', ciudadRouters); 
    app.use('/departamento', departamentoRouters); 
    app.use('/permiso', permisoRouters); 
    app.use('/oferta', ofertaRouters); 
    app.use('/usuario',usuarioRouters);
    app.use('/cohorte',cohorteRouters);

    
    
    /*
    //app.use('/usuario',usuarioRouters);
    //eJ: SI USARA AUTH EN UNA RUTA CLIENTE: app.use('/cliente', auth, ClienteRoutes)
    */
}
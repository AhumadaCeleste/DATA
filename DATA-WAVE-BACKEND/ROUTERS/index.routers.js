module.exports = (app) =>{

    const Auth = require('../MIDDLEWARES/Auth'); // Importa el módulo 'Auth'


    const institutoRouters=require('./instituto.routers');

    /*
    const categoriaRoutes=require('./categoria.routers');
    const productoRouters=require('./producto.routers');
    const carritoRouters=require('./carrito.routers');
    */
    


    app.use('/instituto',institutoRouters);
/*
    app.use('/categoria',categoriaRoutes);
    app.use('/producto',productoRouters);
    app.use('/carrito',carritoRouters);
    app.use('/detcarrito',detcarritoRouters);

    //app.use('/usuario',usuarioRouters);
    //eJ: SI USARA AUTH EN UNA RUTA CLIENTE: app.use('/cliente', auth, ClienteRoutes)

*/
}

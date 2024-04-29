const Rutas =  require('express').Router();
const institutocontroller = require('../CONTROLLERS/instituto.controllers');


// Retornar todos los instituto http://localhost:3001/instituto/lista
Rutas.get('/lista', institutocontroller.lista);

Rutas.get('/lista/:pag', institutocontroller.listaPag);
Rutas.get('/lista/:pag/:text', institutocontroller.listaPag);

// Retornar instituto segun filtro
Rutas.get('/filtrar/:campo/:valor', institutocontroller.filtrar);

// Nuevo instituto http://localhost:3001/instituto/nuevo
Rutas.post('/nuevo', institutocontroller.nuevo);

// Eliminar un instituto 
Rutas.delete('/eliminar/:id', institutocontroller.eliminar);

// Actualizar un instituto
Rutas.put('/actualizar/:id', institutocontroller.actualizar);

module.exports = Rutas;


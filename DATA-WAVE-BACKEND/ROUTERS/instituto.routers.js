const Rutas = require('express').Router();
const institutocontroller = require('../CONTROLLERS/instituto.controllers');

// Retornar todos los instituto http://localhost:3001/instituto/lista
Rutas.get('/lista', institutocontroller.lista);

Rutas.get('/listafull', institutocontroller.listafull);

Rutas.get('/listaquery', institutocontroller.listaquery);

Rutas.get('/listaqueryfiltro/:institutoId',institutocontroller.listaqueryfiltro);

Rutas.get('/lista/:pag', institutocontroller.listaPag);
Rutas.get('/lista/:pag/:text', institutocontroller.listaPag);

// Retornar instituto segun filtro
Rutas.get('/filtrar/:campo/:valor', institutocontroller.filtrar);

// Nuevo instituto http://localhost:3001/instituto/nuevo
Rutas.post('/nuevo', institutocontroller.nuevo);

// institutocontroller.eliminar);
Rutas.delete('/eliminar/:cue', institutocontroller.eliminar);

// institutocontroller.eliminar);
Rutas.put('/actualizar/:cue', institutocontroller.actualizar);

module.exports = Rutas;


const express = require('express');
const Rutas = express.Router();
const ofertaxinstitutocontroller = require('../CONTROLLERS/ofertaxinstituto.controllers');

// Retornar todos los ofertaxinstituto http://localhost:3001/ofertaxinstituto/lista
Rutas.get('/lista', ofertaxinstitutocontroller.lista);

// Retornar ofertaxinstituto según filtro
Rutas.get('/filtrar/:campo/:valor', ofertaxinstitutocontroller.filtrar);

// Nueva ofertaxinstituto http://localhost:3001/ofertaxinstituto/nuevo
Rutas.post('/nuevo', ofertaxinstitutocontroller.nuevo);

// Eliminar un ofertaxinstituto
Rutas.delete('/eliminar/:id', ofertaxinstitutocontroller.eliminar);

// Actualizar un ofertaxinstituto
Rutas.put('/actualizar/:id', ofertaxinstitutocontroller.actualizar);

// Retornar ofertas por instituto
Rutas.get('/instituto/:institutoId/ofertas', ofertaxinstitutocontroller.listaPorInstituto);

module.exports = Rutas;
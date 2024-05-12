const express = require('express');
const app = express();
const port = require('./CONFIG/env').PORT || 3000;
const cors = require('cors'); // Importa el módulo 'cors'

app.use(express.json());


const corsOptions = {
  origin: '*', // Permitir todas las solicitudes desde cualquier origen (¡solo para fines de desarrollo!)
  methods: 'GET,POST,PUT,DELETE', // Permitir todos los métodos HTTP
  allowedHeaders: '*', // Permitir todas las cabeceras (¡solo para fines de desarrollo!)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Usa la configuración de CORS

// Cargar DB y modelos
const db = require('./MODELS');

// Carga de rutas
require('./ROUTERS/index.routers')(app)

// conectar con nuestra BD
db.sequelize
.authenticate() //.sync({ alter: true }) //.authenticate() //
  .then((result) => {
    console.log('conexion exitosa');
  })
  .catch((error) => {
    console.log('ERROR DB al conectar', error.message);  
    });   
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
 
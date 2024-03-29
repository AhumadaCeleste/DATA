const express = require('express');
const app = express();
const port = require('./CONFIG/env').PORT || 3001;
const cors = require('cors'); 

app.use(express.json());


const corsOptions = {
  origin: '*', // Permitir todas las solicitudes desde cualquier origen (¡solo para fines de desarrollo!)
  methods: 'GET,POST,PUT,DELETE', // Permitir todos los métodos HTTP
  allowedHeaders: '*',                                                                                   // Permitir todas las cabeceras (¡solo para fines de desarrollo!)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));                                                                         // Usa la configuración de CORS


const db = require('./MODELS');

// Carga de rutas ACTIVAR AL CREAR
// require('./ROUTERS/index.routers')(app)

// conectar con nuestra BD ACTIVAR LUEGO
db.sequelize
  .sync() //   .sync({ alter: true })
  .then((result) => {
    console.log('conexion exitosa');
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

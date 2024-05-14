const db = require('../MODELS');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const llave ='secreto';

//login usuario
exports.login = (req, res) => {
  db.usuario.findOne({
      where: {
          dni: req.body.dni 
      }
  })
  .then(usuario => {
      if(!usuario){
          res.status(404).send({
              message: "Usuario no encontrado" 
          });
          return;
      }
      const passwordValido = bcrypt.compareSync(req.body.password, usuario.password); 
      if(!passwordValido){
          res.status(401).send({
              message: "Contraseña incorrecta"
          });
          return;
      }

      const token = jwt.sign({id: usuario.id}, llave, {
          expiresIn: '1h' // Generamos un token de autenticación que expira en 24 horas
      });
      
      let usuarioToSend = {...usuario.dataValues}; // Hacemos una copia del objeto de datos del usuario
      delete usuarioToSend.password; // Eliminamos la propiedad de la contraseña
      usuarioToSend.token = token; // Agregamos el token al objeto de datos del usuario
      usuarioToSend.msg = 'Login exitoso'; 
      usuario = usuarioToSend;

      res.status(200).send({
          usuario
      });
      console.log(usuario) 

  }).catch(error => {
    res.status(500).send(error);
    });
}


//nuevo usuario
exports.nuevo = (req, res, next) => {
  if(!req.body.dni ||!req.body.password ||!req.body.idrol){
      res.status(400).send({
          message: "Faltan datos" 
      });
      return;
  }

  // controlamos si dni existe
  db.usuario.findOne({
      where: {
          dni: req.body.dni 
      }
  })
  .then(usuarioExistente => {
      if(usuarioExistente){
          res.status(400).send({
              message: "El DNI ya fue ingresado"
          });
          return;
      }
  
      // Si no existe el dni generamos nuevo usuraio
      const datanuevousuario = {
        id: req.body.id,
        dni: req.body.dni,
        nombre: req.body.nombre, 
        apellido: req.body.apellido, 
        password: bcrypt.hashSync(req.body.password, 8), // Ciframos la contraseña 
        //password: req.body.password,
        idrol: req.body.idrol 
      }
      db.usuario.create(datanuevousuario)
      .then(registro => {
        res.status(201).send(
            {
                resultado: true,
                data: registro
            }
        );
      })
      .catch(error => {
        res.status(500).send(
            {
                resultado: false,
                msg: error
            }
        );
      });

  });
}


exports.filtrar = async (req, res) => {
  const usuarioId = req.params.valor;

  try {
    const usuario = await db.usuario.findByPk(usuarioId, {
      include: [{
        model: db.rol,
        include: [db.permiso]
      }]
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const permisos = usuario.roles ? usuario.roles.reduce((acc, rol) => {
      return acc.concat(rol.permisos);
    }, []) : [];

    res.json(permisos);
  } catch (error) {
    console.error('Error al obtener los permisos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.lista = (req, res) => {
  console.log('Procesamiento de lista de usuario');
  db.usuario.findAll()
      .then(registros => {
          res.status(200).send(registros);
      })
      .catch(error => {
          res.status(500).send(error);
      });
};

exports.listafull = (req,res) =>{
  console.log('Procesamiento de lista');
  // buscar la lista de usuarios
  db.usuario.findAll({include:db.rol}) 
      .then( registros => {
          res.status(200).send(registros);
      })
      .catch(error =>{
          res.status(500).send(error);
      });
};

exports.listafull2 = (req, res) => {
    console.log('Procesamiento de lista');
    // buscar la lista de usuarios
    db.usuario.findAll({
      include: [{
        model: db.rol,
        include: [db.permiso]
      }]
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        res.status(500).send(error);
    });
};
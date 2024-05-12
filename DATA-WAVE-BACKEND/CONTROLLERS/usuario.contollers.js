const db = require('../MODELS');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt'); // Importamos bcrypt para cifrar las contraseñas
const jwt = require('jsonwebtoken'); // Importamos jsonwebtoken para generar tokens de autenticación
const llave = require('dotenv').config().parsed.SECRET_KEY; // Importamos la llave secreta para firmar los tokens


/*
Lo que me dio gpt, para implementar jwt bycycrpt

exports.filtrar = async (req, res) => {
    const palabrasClave = req.body.palabrasClave; // Suponiendo que las palabras clave vienen en el cuerpo de la solicitud
    const token = req.headers.authorization.split(' ')[1]; // Obtener el token de autorización

    try {
        const decodedToken = jwt.verify(token, 'secreto'); // Verificar el token
        if (!decodedToken) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const usuarios = await Promise.all(palabrasClave.map(async (palabraClave) => {
            const usuario = await db.usuario.findByPk(usuarioId, {
                include: [{
                    model: db.rol,
                    include: [db.permiso]
                }]
            });
            return usuario;
        }));

        const permisos = usuarios.map((usuario) => {
            return usuario.roles ? usuario.roles.reduce((acc, rol) => {
                return acc.concat(rol.permisos);
            }, []) : [];
        });

        res.json(permisos);
    } catch (error) {
        console.error('Error al obtener los permisos de los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

*/


//nuevo usuario
exports.nuevo = (req, res, next) => {
  //if(!req.body.dni ||!req.body.password ||!req.body.idrol){
  if(!req.body.dni ||!req.body.password){
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
  db.usuario.findAll({include:db.rol}) /*include: db.roles*/
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
const db = require('../MODELS');
const { Op } = require('sequelize');
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
//creo que listo

/*const db = require('../MODELS');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.lista = (req,res) =>{
    console.log('Procesamiento de lista');
    // buscar la lista de usuarios
    db.usuarios.findAll({include:db.permisos}) 
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

exports.filtrar = (req,res) =>{
    console.log('Procesamiento de lista filtrada');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de usuarios
    db.usuarios.findAll({where: {[campo]:valor}})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

exports.nuevo = async (req,res) => {
    console.log('***********************************************');
    console.log('***********************************************');
    console.log('***********************************************');
    console.log(req.body.nombre);
    console.log('***********************************************');
    console.log('***********************************************');
    console.log('***********************************************');
    //const passwordcrypted = await bcrypt.hash(req.body.password, 10);
    const dataNuevousuarios ={
        nombre: req.body.nombre,
        email: req.body.email,
        dni: req.body.dni,
        password:req.body.password //passwordcrypted
    };

  
        // buscar la lista de usuarios
        db.usuarios.create(dataNuevousuarios)
        .then( registro => {
            res.status(201).send(
                {   resultado:true,
                    data: registro
                }
                );
        })
        .catch(error =>{
            res.status(500).send(
                {   resultado:false,
                    msg: error
                }
            );
        });
};

exports.actualizar = (req,res) => {
    const id = req.params.id;

    console.log('***********************************************');
    console.log(req.body.nombre);
    console.log('***********************************************');

    const datausuarios = {
        nombre: req.body.nombre,
        email: req.body.email,
        dni: req.body.dni
    };
    db.usuarios.update(datausuarios,{
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    data: registro
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo actualizar el registro',
                    body:{
                        data: datausuarios,
                        id:id
                    }
                }
            );
        }
    })
    .catch(error =>{
        res.status(501).send(
            {   resultado:false,
                msg: error
            }
        );
    });
};

exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.usuarios.destroy({
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    data: registro
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo eliminar el registro',
                    body:{
                        data: datausuarios,
                        id:id
                    }
                }
            );
        }
    })
    .catch(error =>{
        res.status(501).send(
            {   resultado:false,
                msg: error
            }
        );
    });
};

exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const roleId=req.body.roleId;
    console.log('***********************************************');
    console.log(req.body.email);
    console.log('***********************************************');
    const usuarios = await db.usuarios.findOne({where:{email:email},include:db.permisos});
    console.log("usuario",usuarios);
    if(usuarios){
      
        const passwordValido = usuarios.password; //await bcrypt.compare(password, usuarios.password);
        if(passwordValido){
            const tokenCrypted = jwt.sign({
                email: usuarios.email,
                usuariosId: usuarios.id,
                nombre: usuarios.nombre,
                dni: usuarios.dni,
                roleId: usuarios.roleId,
                //sigla: usuarios.role.sigla,
            },'Millave123456$',{expiresIn: '24h'}
            )
            const loginNuevousuarios ={
                nombre: req.body.nombre,
                email: req.body.email,
                dni: req.body.dni,
                roleId: usuarios.roleId,
               // sigla: usuarios.role.sigla,
                //password:req.body.password //passwordcrypted
            };
            res.status(200).send(
                {   resultado:true,
                    nombre: usuarios.email,
                    roleId: usuarios.roleId,
                   // sigla: usuarios.role.sigla,
                    msg: 'Login de usuario exitoso',
                    token: tokenCrypted
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'Password incorrecto'
                }
            );
        }
    }else{
        res.status(500).send(
            {   resultado:false,
                msg: 'No se encontro el usuario'
            }
        );
    }
}
*/
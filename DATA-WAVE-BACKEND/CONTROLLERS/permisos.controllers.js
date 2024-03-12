/*
const db = require('../MODELS');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.lista = (req, res) => {
    console.log('Procesamiento de lista');
    // buscar la lista de clientes
    db.Cliente.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.filtrar = (req, res) => {
    console.log('Procesamiento de lista filtrada');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`);
    // buscar la lista de clientes
    db.Cliente.findAll({ where: { [campo]: valor } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

exports.nuevo = async (req, res) => {
    console.log('***********************************************');
    console.log('***********************************************');
    console.log('***********************************************');
    console.log(req.body.nombre);
    console.log('***********************************************');
    console.log('***********************************************');
    console.log('***********************************************');
    const passwordcrypted = await bcrypt.hash(req.body.password, 10);
    const dataNuevoCliente = {
        nombre: req.body.nombre,
        dni: req.body.dni,
        direccion: req.body.direccion,
        email: req.body.email,
        password: passwordcrypted, // Utiliza la versión encriptada
    };

    // buscar la lista de clientes
    db.Cliente.create(dataNuevoCliente)
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
};

exports.actualizar = (req, res) => {
    const id = req.params.id;

    console.log('***********************************************');
    console.log(req.body.nombre);
    console.log('***********************************************');

    const dataCliente = {
        nombre: req.body.nombre,
        dni: req.body.dni,
        direccion: req.body.direccion,
        email: req.body.email,
        dni: req.body.dni,
    };

    db.Cliente.update(dataCliente, {
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        data: registro
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo actualizar el registro',
                        body: {
                            data: dataCliente,
                            id: id
                        }
                    }
                );
            }
        })
        .catch(error => {
            res.status(501).send(
                {
                    resultado: false,
                    msg: error
                }
            );
        });
};

exports.eliminar = (req, res) => {
    const id = req.params.id;
    db.Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send(
                    {
                        resultado: true,
                        data: registro
                    }
                );
            } else {
                res.status(500).send(
                    {
                        resultado: false,
                        msg: 'No se pudo eliminar el registro',
                        body: {
                            data: dataCliente,
                            id: id
                        }
                    }
                );
            }
        })
        .catch(error => {
            res.status(501).send(
                {
                    resultado: false,
                    msg: error
                }
            );
        });
};

exports.login = async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log('***********************************************');
    console.log(req.body.email);
    console.log('***********************************************');
    const cliente = await db.Cliente.findOne({where:{email:email}});
    if(cliente){
        const passwordValido = cliente.password; //await bcrypt.compare(password, usuario.password);
        if(passwordValido){
            const tokenCrypted = jwt.sign({
                email: cliente.email,
                clienteId: cliente.id,
                nombre: cliente.nombre,
                dni: cliente.dni,
                direccion: cliente.direccion, 
            },'Millave123456$',{expiresIn: '24h'}
            )
            const loginNuevoCliente ={
                nombre: req.body.nombre,
                email: req.body.email,
                dni: req.body.dni,
                direccion: req.body.direccion, 
                password:req.body.password //passwordcrypted
            };
            res.status(200).send(
                {   resultado:true,
                    nombre: cliente.email,
                    msg: 'Login de cliente exitoso',
                    token: tokenCrypted
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'Password cliente incorrecto'
                }
            );
        }
    }else{
        res.status(500).send(
            {   resultado:false,
                msg: 'No se encontro el cliente'
            }
        );
    }
}
*/
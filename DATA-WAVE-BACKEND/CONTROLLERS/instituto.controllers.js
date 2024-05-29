const db = require('../MODELS');
const sequelize = db.sequelize;
const {Op} = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Institutos');
    db
        .instituto
        .findAll()
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
};

// lista con query
exports.listaquery = async (req, res) => {
    console.log('Procesamiento de lista de Institutos full');
    try {
        const registros = await sequelize.query(
            `
        SELECT i.cue, i.ee, i.denominacion, i.cuesede,
	t.id as id_tipo, t.descripcion as instituto, 
    c.id as id_ciudad, c.nombre as ciudad,
    d.id as id_dpto, d.nombre as departamento,
    s.id as id_sucursal, s.descripcion as sucursal
from instituto i
	inner join tipoinstituto t ON i.tipoinstitutoId = t.id
    inner join ciudad c on i.CiudadId=c.id
    inner join sucursal s on i.sucursalId=s.id
    inner join departamento d on c.departamentoId=d.id `,
            {type: sequelize.QueryTypes.SELECT}
        );
        res
            .status(200)
            .send(registros);
    } catch (error) {
        console.error(
            'Error al obtener la lista completa de Institutos con tipo y sucursal:',
            error
        );
        res
            .status(500)
            .send({error: 'Error al obtener la lista completa de Institutos con Ofertas'});
    }
};

// lista con query con filtrado
exports.listaqueryfiltro = async (req, res) => {
    console.log('Procesamiento de lista de Institutos full');
    const institutoId = req.params.institutoId; // Obtener el parámetro de entrada
    //Evitar Error Object-Object
    try {
        const registros = await sequelize.query(
            `
        SELECT i.cue, i.ee, t.descripcion as tipo_isntituto, c.nombre as ciudad, s.descripcion as sucursal
        from instituto i 
        inner join tipoinstituto t ON i.tipoinstitutoId = t.id 
        inner join ciudad c on i.CiudadId=c.id 
        inner join sucursal s on i.sucursalId=s.id 
        where i.cue=:institutoId
        `,
            {
                replacements: {
                    institutoId: institutoId
                },
                type: sequelize.QueryTypes.SELECT
            }
        );
        res
            .status(200)
            .send(registros);
    } catch (error) {
        console.error(
            'Error al obtener la lista completa de Institutos con Ofertas:',
            error
        );
        res
            .status(500)
            .send({error: 'Error al obtener la lista completa de Institutos con Ofertas'});
    }
};

//-----------------------------------listafull
exports.listafull = (req, res) => {
    console.log('Procesamiento de lista de Institutos full');
    db
        .instituto
        .findAll({include: db.tipoinstituto})
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de instituto filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    db
        .instituto
        .findAll({
            where: {
                [campo]: {
                    [Op.like]: `%${valor}%`
                }
            }
        })
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nuevo instituto');
    console.log(req.body.denominacion);
    const datanuevoinstituto = {
        cue: req.body.cue,
        ee: req.body.ee,
        denominacion: req.body.denominacion,
        cuesede: req.body.cuesede,
        tipoinstitutoId: req.body.tipoinstitutoId,
        CiudadId: req.body.CiudadId,
        sucursalId: req.body.sucursalId
    };
    db
        .instituto
        .create(datanuevoinstituto)
        .then(registro => {
            res
                .status(201)
                .send({resultado: true, data: registro});
        })
        .catch(error => {
            res
                .status(500)
                .send({resultado: false, msg: error});
        });
};

//-------------------------------------actualizar
exports.actualizar = (req, res) => {
    const cue = req.params.cue;
    console.log('Actualizar Instituto');

    const datanuevoinstituto = {
        ee: req.body.ee,
        denominacion: req.body.denominacion,
        cuesede: req.body.cuesede,
        tipoinstitutoId: req.body.tipoinstitutoId,
        CiudadId: req.body.CiudadId,
        sucursalId: req.body.sucursalId
    };
    console.log('Data a actualizar:', datanuevoinstituto);
    db
        .instituto
        .update(datanuevoinstituto, {
            where: {
                cue: cue
            }
        })
        .then(num => {
            if (num > 0) {
                res
                    .status(201)
                    .send({resultado: true, msg: 'Instituto actualizado correctamente'});
            } else {
                res
                    .status(500)
                    .send({
                        resultado: false,
                        msg: 'No se pudo actualizar el Instituto',
                        body: {
                            data: datanuevoinstituto,
                            cue: cue
                        }
                    });
            }
        })
        .catch(error => {
            res
                .status(501)
                .send({resultado: false, msg: error});
        });
};
//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db
        .instituto
        .destroy({
            where: {
                cue: cue
            }
        })
        .then(num => {
            if (num > 0) {
                res
                    .status(200)
                    .send({resultado: true, msg: 'Instituto eliminado correctamente'});
            } else {
                res
                    .status(404)
                    .send({
                        resultado: false,
                        msg: 'No se pudo encontrar el Instituto',
                        body: {
                            cue: cue
                        }
                    });
            }
        })
        .catch(error => {
            console.error('Error al eliminar el Instituto:', error);
            res
                .status(500)
                .send(
                    {resultado: false, msg: 'Error al eliminar el Instituto', error: error.message}
                );
        });
};

//-----------------------------------listaPag
exports.listaPag = (req, res) => {
    console.log('Procesamiento de lista filtrada por pagina');
    let pag = req.params.pag || 1;
    const text = req.params.text || "";
    const limit = 3; // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)

    const whereCondition = text
        ? {
            denominacion: {
                [Op.like]: `%${text}%`
            }
        }
        : {};

    db
        .instituto
        .findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
            order: [
                ['id', 'ASC']
            ]
        })
        .then(registros => {
            res
                .status(200)
                .send(registros);
        })
        .catch(error => {
            res
                .status(500)
                .send(error);
        });
};
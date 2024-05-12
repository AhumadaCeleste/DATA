const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Institutos');
    db.instituto.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de instituto filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    db.instituto.findAll({ where: { [campo]: { [Op.like]: `%${valor}%` } } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
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
        cuesede:req.body.cuesede,
        tipoinstitutoId:req.body.tipoinstitutoId,
        CiudadId:req.body.CiudadId,
        sucursalId:req.body.sucursalId,
    };
    db.instituto.create(datanuevoinstituto)
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
        sucursalId: req.body.sucursalId,
    };
    console.log('Data a actualizar:', datanuevoinstituto);
    db.instituto.update(datanuevoinstituto, {
        where: { cue: cue }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send({
                    resultado: true,
                    msg: 'Instituto actualizado correctamente'
                });
            } else {
                res.status(500).send({
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
            res.status(501).send({
                resultado: false,
                msg: error
            });
        });
};
//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db.instituto.destroy({
        where: { cue: cue }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send({
                    resultado: true
                });
            } else {
                res.status(500).send({
                    resultado: false,
                    msg: 'No se pudo eliminar el Instituto',
                    body: {
                        cue: cue
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(501).send({
                resultado: false,
                msg: error
            });
        });
};

//-----------------------------------listaPag
exports.listaPag = (req,res) =>{
    console.log('Procesamiento de lista filtrada por pagina');
    let pag = req.params.pag || 1;
    const text = req.params.text || "";
    const limit = 3;   // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    
    const whereCondition = text ? { denominacion: { [Op.like]: `%${text}%` } } : {};

    db.instituto.findAndCountAll({ where: whereCondition, limit: limit, offset: offset, order: [['id', 'ASC']] })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            res.status(500).send(error);
        });
};
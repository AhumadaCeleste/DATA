const db = require('../MODELS');
const { Op } = require('sequelize');

// Retornar todos los ofertaxinstituto
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Oferta por Instituto');
    db.ofertaxinstituto.findAll({
        include: [{
            model: db.oferta,
            attributes: ['nombre']
        }]
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        console.error('Error al obtener lista de Oferta por Instituto:', error);
        res.status(500).send({ error: 'Error al obtener lista de Oferta por Instituto' });
    });
};

// Filtrar ofertaxinstituto
exports.filtrar = (req, res) => {
    console.log('Procesamiento de oferta filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`);
    db.ofertaxinstituto.findAll({
        include: [{
            model: db.oferta,
            where: { [campo]: { [Op.like]: `%${valor}%` } }
        }]
    })
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        console.error('Error al filtrar las ofertas x Instituto:', error);
        res.status(500).send({ error: 'Error al filtrar las ofertas' });
    });
};

// Crear nueva ofertaxinstituto
exports.nuevo = (req, res) => {
    console.log('Nueva oferta por instituto');
    const datanuevoofertaxinstituto = {
        institutoCue: req.body.institutoCue,
        ofertumId: req.body.ofertumId,
        matricula: req.body.matricula,
        año: req.body.año,
    };
    db.ofertaxinstituto.create(datanuevoofertaxinstituto)
    .then(registro => {
        res.status(201).send({
            resultado: true,
            data: registro
        });
    })
    .catch(error => {
        console.error('Error al crear la oferta por instituto:', error);
        res.status(500).send({ error: 'Error al crear la oferta por instituto' });
    });
};

// Actualizar ofertaxinstituto
exports.actualizar = (req, res) => {
    const id = req.params.id;
    console.log('Actualizar oferta por instituto');
    const dataActualizada = {
        institutoCue: req.body.institutoCue,
        ofertumId: req.body.ofertumId,
        matricula: req.body.matricula,
        año: req.body.año,
    };
    db.ofertaxinstituto.update(dataActualizada, {
        where: { id: id }
    })
    .then(num => {
        if (num > 0) {
            res.status(201).send({
                resultado: true,
                msg: 'Oferta por instituto actualizada correctamente'
            });
        } else {
            res.status(500).send({
                resultado: false,
                msg: 'No se pudo actualizar la oferta por instituto',
                body: {
                    data: dataActualizada,
                    id: id
                }
            });
        }
    })
    .catch(error => {
        console.error('Error al actualizar la oferta por instituto:', error);
        res.status(501).send({ error: 'Error al actualizar la oferta por instituto' });
    });
};

// Eliminar ofertaxinstituto
exports.eliminar = (req, res) => {
    const id = req.params.id;
    db.ofertaxinstituto.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num > 0) {
            res.status(201).send({
                resultado: true
            });
        } else {
            res.status(500).send({
                resultado: false,
                msg: 'No se pudo eliminar la oferta por instituto',
                body: {
                    id: id
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

// Retornar ofertas por instituto
exports.listaPorInstituto = (req, res) => {
    console.log('Procesamiento de lista de ofertas por instituto');
    const institutoId = req.params.institutoId;
    db.ofertaxinstituto.findAll({
        where: { institutoId: institutoId },
        include: [{
            model: db.oferta,
            attributes: ['nombre']
        }]
    })
    .then(ofertas => {
        res.status(200).send(ofertas);
    })
    .catch(error => {
        console.error('Error al obtener lista de ofertas por instituto:', error);
        res.status(500).send({ error: 'Error al obtener lista de ofertas por instituto' });
    });
};
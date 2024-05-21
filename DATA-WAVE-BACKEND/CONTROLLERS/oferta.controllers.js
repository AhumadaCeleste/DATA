const db = require('../MODELS');
const { Op } = require('sequelize');

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de Oferta');
    db.oferta.findAll()
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            console.error('Error al obtener la lista de ofertas:', error);
            res.status(500).send({ error: 'Error al obtener la lista de ofertas' });
        });
};

//-----------------------------------listafull
exports.listafull = (req,res) =>{
    console.log('Procesamiento de lista de Ofertas full');
    db.oferta.findAll({include:db.cohorte}) 
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
  };

//-----------------------------------filtrar
exports.filtrar = (req, res) => {
    console.log('Procesamiento de oferta filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    //aqui adecue usando op.like ya que tengo oferta con nombre similares 
    //en la cedena de texto del campo
    db.oferta.findAll({ where: { [campo]: { [Op.like]: `%${valor}%` } } })
        .then(registros => {
            res.status(200).send(registros);
        })
        .catch(error => {
            console.error('Error al filtrar las ofertas:', error);
            res.status(500).send({ error: 'Error al filtrar las ofertas' });
        });
};

//-----------------------------------nuevo
exports.nuevo = (req, res) => {
    console.log('nueva oferta');
    console.log(req.body.nombre);
    const datanuevooferta = {
        resolucion: req.body.resolucion,
        nombre: req.body.nombre,
        sector: req.body.sector,
        descripcion:req.body.descripcion,
    };
    db.oferta.create(datanuevooferta)
        .then(registro => {
            res.status(201).send(
                {
                    resultado: true,
                    data: registro
                }
            );
        })
        .catch(error => {
            console.error('Error al crear la oferta:', error);
            res.status(500).send({ error: 'Error al crear la oferta' });
        });
};

//-------------------------------------actualizar
exports.actualizar = (req, res) => {
    const cue = req.params.id; // Usar req.params.id como cue
    console.log('Actualizar oferta');
    console.log(req.body.id);

    const datanuevooferta = {
        resolucion: req.body.resolucion,
        nombre: req.body.nombre,
        sector: req.body.sector,
        descripcion:req.body.descripcion,
    };
    db.oferta.update(datanuevooferta, {
        where: { cue: cue }
    })
        .then(num => {
            if (num > 0) {
                res.status(201).send({
                    resultado: true,
                    msg: 'Oferta actualizado correctamente'
                });
            } else {
                res.status(500).send({
                    resultado: false,
                    msg: 'No se pudo actualizar la oferta',
                    body: {
                        data: datanuevooferta,
                        cue: cue
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error al actualizar la oferta:', error);
            res.status(501).send({ error: 'Error al actualizar la oferta' });
        });
};
//-----------------------------------eliminar
exports.eliminar = (req, res) => {
    const cue = req.params.cue;
    db.oferta.destroy({
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
                    msg: 'No se pudo eliminar el Oferta',
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
    let pag = req.params.pag;
    const text = req.params.text;
    if(!pag) {pag = 1;}
    const limit = 3;   // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    // buscar la lista
    if (!text){
    db.oferta.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.oferta.findAndCountAll({where: {denominacion: {
            [Op.like]: `%${text}%`
        }}, limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }
};

/*const db = require('../MODELS');
const Op = db.Sequelize.Op;

//-----------------------------------lista
exports.lista = (req,res) =>{
    
    console.log('cupones');
    
    db.cupones.findAll()
    .then( registros => {
        res.status(200).send(registros);
    })
    .catch(error =>{
        res.status(500).send(error);
    });
    
};

//-----------------------------------filtrar
exports.filtrar = (req,res) =>{
    console.log('Procesamiento de cupones filtrada');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de cupones
    db.cupones.findAll({where: {[campo]:valor}})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req,res) => {
    console.log('nuevo cupones');
    console.log(req.body.nombre);
    const datanuevacupones ={
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descuento: req.body.descuento,
    };
        db.cupones.create(datanuevacupones)
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


//-------------------------------------actualizar
exports.actualizar = (req,res) => {
    const id = req.params.id;

    console.log('Actualizar cupones');
    console.log(req.body.id);

    const datacupones = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descuento: req.body.descuento,
    };
    db.cupones.update(datacupones,{
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    msg: 'cupones actualizado correctamente'
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo actualizar el cupones',
                    body:{
                        data: datacupones,
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

//-----------------------------------eliminar
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.cupones.destroy({
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo eliminar el cupones',
                    body:{
                        data: datacupones,
                        id:id
                    }
                }
            );
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(501).send(
            {   resultado:false,
                msg: error
            }
        );
    });
};

exports.listaPag = (req,res) =>{
    console.log('Procesamiento de lista filtrada por pagina');
    const pag = req.params.pag;
    const text = req.params.text;
    if(!pag) {pag = 1;}
    const limit = 9;   // number of records per page
    const offset = (pag - 1) * limit;
    console.log(`pagina: ${pag} texto:${text}`)
    // buscar la lista
    if (!text){
    db.cupones.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.cupones.findAndCountAll({where: {nombre: {
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
*/
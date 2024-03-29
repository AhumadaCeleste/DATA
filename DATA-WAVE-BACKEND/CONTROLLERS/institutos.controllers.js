
/*
const db = require('../MODELS');

//-----------------------------------lista
exports.lista = (req,res) =>{
    
    console.log('Procesamiento de lista de venta');
    
    db.venta.findAll()
    .then( registros => {
        res.status(200).send(registros);
    })
    .catch(error =>{
        res.status(500).send(error);
    });
    
};

//-----------------------------------filtrar
exports.filtrar = (req,res) =>{
    console.log('Procesamiento de venta filtrada');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de venta
    db.venta.findAll({where: {[campo]:valor}})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req,res) => {
    console.log('nueva venta');
    console.log(req.body.numero);
    const datanuevaventa ={
        numero: req.body.numero,
        observacion: req.body.observacion,
        carritoId: req.body.carritoId
    };
        db.venta.create(datanuevaventa)
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

    console.log('Actualizar venta');
    console.log(req.body.id);

    const dataventa = {
        numero: req.body.numero,
        observacion: req.body.observacion,
        carritoId: req.body.carritoId
    };
    db.venta.update(dataventa,{
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    msg: 'Venta actualizada correctamente'
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo actualizar la venta',
                    body:{
                        data: dataventa,
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
    db.venta.destroy({
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
                    msg: 'No se pudo eliminar la venta',
                    body:{
                        data: dataventa,
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
*/
//DESCOMENTAR ACA 
//const db = require('../MODELS');

//-----------------------------------lista
exports.lista = (req,res) =>{
    
    console.log('Procesamiento de ciclos');
    
    db.ciclos.findAll()
    .then( registros => {
        res.status(200).send(registros);
    })
    .catch(error =>{
        res.status(500).send(error);
    });
    
};

//-----------------------------------filtrar
exports.filtrar = (req,res) =>{
    console.log('Procesamiento de carito filtrado');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de ciclos
    db.ciclos.findAll({where: {[campo]:valor}})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req,res) => {
    console.log('nuevo ciclo');
    console.log(req.body.numero);
    const datanuevociclos ={
        numero: req.body.numero,
        observacion: req.body.observacion
    };
        db.ciclos.create(datanuevociclos)
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

    console.log('Actualizar ciclos');
    console.log(req.body.id);

    const dataciclos = {
        numero: req.body.numero,
        observacion: req.body.observacion
    };
    db.ciclos.update(dataciclos,{
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    msg: 'Ciclos actualizada correctamente'
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo actualizar el ciclo',
                    body:{
                        data: dataciclos, //,
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
    db.ciclos.destroy({
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
                    msg: 'No se pudo eliminar el ciclo',
                    body:{
                        data: dataciclo,
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
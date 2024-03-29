

/*
const db = require('../MODELS');
const Op = db.Sequelize.Op;

//-----------------------------------lista
exports.lista = (req, res) => {
    console.log('Procesamiento de lista de categorias');

    db.categoria.findAll()
    .then(registros => {
        res.status(200).send(registros);
    })
    .catch(error => {
        res.status(500).send(error);
    });
    console.log(this.lista)
};

//-----------------------------------filtrar
exports.filtrar = (req,res) =>{
    console.log('Procesamiento de categoria filtrada');
    const campo = req.params.campo;
    const valor = req.params.valor;
    console.log(`campo: ${campo} valor:${valor}`)
    // buscar la lista de categorias
    db.categoria.findAll({where: {[campo]:valor}})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
};

//-----------------------------------nuevo
exports.nuevo = (req,res) => {
    console.log('nueva categoria');
    console.log(req.body.nombre);
   // console.log(req.body.descripcion);
    const datanuevacategoria ={
        
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
    };
        db.categoria.create(datanuevacategoria)
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

    console.log('Actualizar categoria');
    console.log(req.body.id);

    const datacategoria = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };
    db.categoria.update(datacategoria,{
        where: {id:id}
    })
    .then( num => {
        if(num > 0){
            res.status(201).send(
                {   resultado:true,
                    msg: 'Categoria actualizada correctamente'
                }
                );
        }else{
            res.status(500).send(
                {   resultado:false,
                    msg: 'No se pudo actualizar la categoria',
                    body:{
                        data: datacategoria,
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
    db.categoria.destroy({
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
                    msg: 'No se pudo eliminar la categoria',
                    body:{
                        data: datacategoria,
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
    db.categoria.findAndCountAll({limit: limit, offset: offset, order: [['id', 'ASC']]})
        .then( registros => {
            res.status(200).send(registros);
        })
        .catch(error =>{
            res.status(500).send(error);
        });
    }else{
        db.categoria.findAndCountAll({where: {nombre: {
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
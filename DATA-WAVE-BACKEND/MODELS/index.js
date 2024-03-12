const Sequelize = require ('sequelize');
//con mayus requiere toda la dependencia 

// buscar la configuracion en db.config
const dbConfig = require('../CONFIG/db.config');


const sequelize = new Sequelize(

    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        Host: dbConfig.HOST,        //configura la base de datos con los datos en la ruta d.config
        dialect: dbConfig.dialect,
        port: dbConfig.port,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//carga de modelos
db.institutos=require('./instituto.models')(sequelize);
//db.usuarios=require('./usuarios.models')(sequelize);
//db.permisos=require('./permisos.models')(sequelize);
//db.tecnicaturas=require('./tecnicaturas.models')(sequelize);
//db.ciclos=require('./ciclos.models')(sequelize);
//db.matriculas=require('./matriculas.models')(sequelize);


//RELACIONES

// INSTITUTOS - TECNICATURAS
db.institutos.hasMany(db.tecnicaturas);
db.tecnicaturas.hasMany(db.institutos);

//db.institutos.hasMany(db.tecnicaturas,{foreignKey: 'paiId'});
//db.tecnicaturas.belongsTo(db.institutos,{foreignKey: 'paiId'});


// USUARIOS - PERMISOS
db.ususario.belongsTo(db.permisos);
db.permisos.hasMany(db.usuarios);

//USUARIOS - INSTITUTOS
db.usuarios.belongsTo(db.institutos);
db.institutos.hasMany(db.usuarios);

// INSTITUTOS - USUARIOS
db.institutos.hasMany(db.usuarios);
db.usuarios.belongsTo(db.institutos);

// TECNICATURA - CICLO
db.tecnicaturas.hasMany(db.ciclos);
db.ciclos.hasMany(db.tecnicaturas);

//CICLOS - MATRICULA
db.ciclos.belongsTo(db.matriculas);
db.matriculas.belongsTo(db.ciclos)





module.exports = db; //requiere en el index principal
const Sequelize = require('sequelize');
const dbConfig = require('../CONFIG/db.config');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define los modelos
db.ciudad = require('./ciudad.models')(sequelize);
db.cohorte = require('./cohorte.models')(sequelize);
db.departamento = require('./departamento.model')(sequelize);
db.instituto = require('./instituto.models')(sequelize);
db.oferta = require('./oferta.models')(sequelize);
db.ofertaxinstituto = require('./ofertaxinstituto.models')(sequelize);
db.permiso = require('./permiso.models')(sequelize);
db.permisoxrol = require('./permisoxrol.models')(sequelize);
db.rol = require('./rol.models')(sequelize);
db.tipoapertura = require('./tipoapertura.models')(sequelize);
db.usuario = require('./usuario.models')(sequelize);

// Relaciones
db.instituto.hasMany(db.usuario);
db.usuario.belongsTo(db.instituto);

db.usuario.belongsTo(db.rol);
db.rol.hasMany(db.usuario);

db.rol.belongsToMany(db.permiso, { through: db.permisoxrol });
db.permiso.belongsToMany(db.rol, { through: db.permisoxrol });

db.departamento.hasMany(db.ciudad);
db.ciudad.belongsTo(db.departamento);

db.ciudad.hasMany(db.instituto);
db.instituto.belongsTo(db.ciudad);

db.instituto.belongsToMany(db.oferta, { through: db.ofertaxinstituto });
db.oferta.belongsToMany(db.instituto, { through: db.ofertaxinstituto });

db.oferta.hasMany(db.cohorte);
db.cohorte.belongsTo(db.oferta);

db.tipoapertura.hasMany(db.cohorte);
db.cohorte.belongsTo(db.tipoapertura);

module.exports = db;
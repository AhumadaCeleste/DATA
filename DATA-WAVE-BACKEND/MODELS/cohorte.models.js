const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const cohorte= sequelize.define('cohorte', 
    {
        // id automatico, no se completa

        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,         // Añadida como clave primaria
            autoIncrement: true    
        },
        desde: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hasta: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })
    return cohorte;
}
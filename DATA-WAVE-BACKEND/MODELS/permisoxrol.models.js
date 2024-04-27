const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const permisoxrol = sequelize.define("permisoxrol", 
    {
        // id automatico, no se completa
      
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    })
    return permisoxrol;
}
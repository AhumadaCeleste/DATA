const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const permiso = sequelize.define("permiso", 
    {
        // id automatico, no se completa
        descripcion: {
            type: DataTypes.STRING(25),
            allowNull: false,
        }
    })
    return permiso;
}
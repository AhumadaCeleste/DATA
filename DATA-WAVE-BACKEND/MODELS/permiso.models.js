const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const permiso = sequelize.define("permiso", 
    {
        // id automatico, no se completa
        descripcion: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        palabraclave: {
            type: DataTypes.STRING(25),
            allowNull: false,
        }
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    }
)
    return permiso;
}
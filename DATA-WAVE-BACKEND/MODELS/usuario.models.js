const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const usuario = sequelize.define("usuario", 
    {
        // id automatico, no se completa
            dni: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
        }
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    })
    return usuario;
}
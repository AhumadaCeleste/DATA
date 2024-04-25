const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const usuario = sequelize.define("usuario", 
    {
        // id automatico, no se completa
        numero: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },

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
        }
    })
    return usuario;
}
const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    const permisos = sequelize.define('permisos',
    {
        administrador: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
      
       
      
    },
    )
    return permisos;
}
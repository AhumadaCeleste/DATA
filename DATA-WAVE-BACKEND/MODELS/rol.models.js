const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
    // nombre de tabla en BD
    const rol = sequelize.define("rol", 
    {
        descripcion:{
            type: DataTypes.STRING(45),
            allowNull: true,
        },
   
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    })
    return rol;
}
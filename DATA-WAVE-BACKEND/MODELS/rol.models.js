const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
    // nombre de tabla en BD
    const rol = sequelize.define("rol", 
    {
        descripcion:{
            type: DataTypes.STRING(30),
            allowNull: true,
        },
   
    })
    return rol;
}
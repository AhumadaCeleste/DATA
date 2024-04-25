const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    const oferta = sequelize.define('ofertas',
    {
        // id automatico, no se completa, total, cantidad, fecha, precio total, descuentos, carritoxProducto, etc
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        resolucion:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        
    },
  
    );
    return oferta;
}
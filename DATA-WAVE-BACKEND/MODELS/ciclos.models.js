const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const venta = sequelize.define("venta", 
    {
        // id automatico, no se completa
        numero: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        observacion: {
            type: DataTypes.STRING(200),
            allowNull: true,
        }
    })
    return venta;
}
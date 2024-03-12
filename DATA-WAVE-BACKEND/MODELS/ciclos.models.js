const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const ciclos = sequelize.define("ciclos", 
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
    return ciclos;
}
const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const tecnicaturas= sequelize.define('tecnicaturas', 
    {
        // id automatico, no se completa
        codigo: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sector: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        resolucion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        imgResolucion: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    })
    return tecnicaturas;
}
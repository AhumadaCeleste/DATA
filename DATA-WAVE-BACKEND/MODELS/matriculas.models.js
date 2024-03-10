const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const matriculas = sequelize.define("matriculas", 
    {
        // id automatico, no se completa
        nombre: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },

     
    })
    return matriculas;
}
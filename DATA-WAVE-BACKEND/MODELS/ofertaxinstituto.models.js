const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const ofertaxinstituto = sequelize.define("ofertaxinstituto", 
    {
        // id automatico, no se completa
        cue: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
        },
      
    })
    return ofertaxinstituto;
}
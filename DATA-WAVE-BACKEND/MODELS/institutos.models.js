const { DataTypes } = require ('sequelize');

module.exports = (sequelize) =>{
    
                                         // nombre de tabla en BD
    const institutos = sequelize.define("institutos", 
    {
        // id automatico, no se completa
        EE: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        CUE: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        departamento: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        localidad: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(35),
            allowNull: true,
        }
    })
    return institutos;
}
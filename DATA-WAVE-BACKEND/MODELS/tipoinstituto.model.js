const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const tipoinstituto = sequelize.define("tipoinstituto", {
        descripcion: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    });

    return tipoinstituto;
};
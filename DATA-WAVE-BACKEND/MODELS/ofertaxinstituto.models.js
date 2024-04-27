const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ofertaxinstituto = sequelize.define('ofertaxinstituto', {
        matricula: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        año: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false, // Si no necesitas timestamps
        freezeTableName: true, // Para evitar la pluralización automática del nombre de la tabla
    }
);

    return ofertaxinstituto;
};
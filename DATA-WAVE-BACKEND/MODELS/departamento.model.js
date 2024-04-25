const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    const departamento = sequelize.define('departamento', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    });

    return departamento;
};
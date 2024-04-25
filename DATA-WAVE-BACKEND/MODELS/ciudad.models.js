const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    const ciudad = sequelize.define("ciudad", {
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,  // Si numero es la clave primaria
            autoIncrement: true // Si es autoincremental
        },

        nombre: {
            type: DataTypes.STRING(20),  // Asumiendo que el nombre es un texto de hasta 20 caracteres
            allowNull: false,
        }
    });

    return ciudad;
};
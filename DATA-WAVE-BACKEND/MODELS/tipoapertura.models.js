const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    
    const tipoapertura = sequelize.define("tipoapertura", {
        nombre:{
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    });

    return tipoapertura;
};
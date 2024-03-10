const { DataTypes, INTEGER } = require('sequelize');

module.exports = (sequelize) => {
    
    const usuarios = sequelize.define("usuarios", {
        dni: {
            type: DataTypes.INTEGER(13),
            allowNull: false,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        apellido:{
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        cargo:{
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        telefono:{
            type: DataTypes.INTEGER(5),
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING(30),
            allowNull: true,
        }

    });

    return usuarios;
};
const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {
    const instituto = sequelize.define('instituto', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ee: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    });

    return instituto;
};
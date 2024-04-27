const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const instituto = sequelize.define('instituto', {
        cue: {
            type: DataTypes.STRING(15),
            allowNull: false,
            primaryKey: true,
        },
        ee: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        denominacion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        timestamps: false, 
        freezeTableName: true, 
    }
);

    return instituto;
};
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncremet: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {timestamp: false}
  )
};
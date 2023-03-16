const { DataTypes} = require('sequelize');
//I create the Dog model, which will have the attributes requested on the Readme.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    weight: {
      type: DataTypes.JSON,
      allowNull: false, 
    },

    height: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    from_DB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, 
  {timestamps: false,});
};

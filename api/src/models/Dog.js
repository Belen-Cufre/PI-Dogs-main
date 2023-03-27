const { DataTypes} = require('sequelize');
//I create the Dog model, which will have the attributes requested on Readme file.

module.exports = (sequelize) => {
  // I define the model
  sequelize.define('Dog', {
    weightMax: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    weightMin: {
      type: DataTypes.STRING,
      allowNull: false, 
    },

    averageWeight: {
      type: DataTypes.STRING,
      allowNull: true 
    },

    height: {
      type: DataTypes.STRING,
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

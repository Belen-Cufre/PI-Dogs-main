require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: true,
    native:true,
  }
});

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// We read all the files on Models folder and require and add them to the modeDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// We use the conection (sequelize) in all models
modelDefiners.forEach(model => model(sequelize));
// We capitalize all the model names, i.e. product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// In sequelize.models, all imported models are so as properties
// To relate them, we do destructuring
const { Dog, Temperament } = sequelize.models;

// Here come the relations
//From many to many
Dog.belongsToMany(Temperament, {through: 'dog_temperaments'})//we choose the name of the intermediate table.
Temperament.belongsToMany(Dog, {through: 'dog_temperaments'})

module.exports = {
  ...sequelize.models, // to import all models in this way: const { Product, User } = require('./db.js');
  conn: sequelize,     // to import the conection { conn } = require('./db.js');
};

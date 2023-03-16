// require('dotenv').config();
const axios= require ("axios");
const {Temperament} = require ("../db")
// const {API_KEY} = process.env

let gettingAlltempsfromApi= async ()=> {
    let datas= await axios ('https://api.thedogapi.com/v1/breeds')

    let allTemps= datas.data
        .map((el) => (el.temperament ? el.temperament : ""))
        .map((el) => el?.split(", "));

    let temps = [...new Set(allTemps.flat())];

    temps.forEach((el)=> {
        if (el) {
            Temperament.bulkCreate({
                where:{
                    name: el
                },
            });
        }
    });
    temps = await Temperament.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
       });
    return temps;
 };

module.exports= {gettingAlltempsfromApi};
// require('dotenv').config();
const axios= require ("axios");
const {Temperament} = require ("../db")
// const {API_KEY} = process.env

let gettingAlltempsfromApi= async ()=> {
    let datas= await axios ('https://api.thedogapi.com/v1/breeds')

    let allTemps= datas.data;
    allTemps.map((el) => (el.temperament ? el.temperament : ""))
        .map((el) => el.split(", "));

    let temps = [...new Set(allTemps.flat())];

    temps.forEach((el)=> {
        if (el) {
            Temperament.findOrCreate({
                where:{
                    name: el
                },
            });
        }
    });
    temps = await Temperament.findAll();
 };

module.exports= {gettingAlltempsfromApi};
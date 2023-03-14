const axios= require ("axios");
const Temperament = require ("../db")

let gettingAlltempsfromApi= async ()=> {
    let data= await axios (`https://api.thedogapi.com/v1/breeds?api_key={API_KEY}`).data

    let allTemps= []

    data.map(elem=>{
        allTemps.push(elem.temperament)
    })
    let temps= allTemps.reduce((acc,item)=>{
        if(!acc.includes(item)){
          acc.push(item);
        }
        return acc;
    },[]);
    
    Temperament.create({temps})
};

module.exports= {gettingAlltempsfromApi};
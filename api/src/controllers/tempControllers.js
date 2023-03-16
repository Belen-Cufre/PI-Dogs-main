//In this file, I created the controller I will use on my temper handler.
//It is a file which will control the logic on my temperament route.

const axios= require ("axios");

//I import my Temperament model.

const {Temperament} = require ("../db")

//This function has to:
//*bring the data from the api;
//*select the .data from the obtained info and map it twice: 1) to see if in each instance, whithin the temperament attribute, there is something. If yes=>save it, if NO=> send an empty string. Then 2), to see all elements and split them by a comma so as to end up having an array of a lot of separeted strings.
//*eliminate all the repeated strings from the array and save all strings as arrays
//*create a temperament in Temperament model for each array found on the info beforementioned
//*finally bring all the information stored on my DB.

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
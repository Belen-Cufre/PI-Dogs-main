//In this file, I created the controller I will use on my temper handler.
//It is a file which will control the logic on my temperament route.

const axios= require ("axios");

//I import my Temperament model.

const {Temperament} = require ("../db")

//This function has to:
//*bring the data from the api;
//*select the .data from the obtained info and map it twice: 1) to see if in each instance, whithin the temperament attribute, there is something. If yes=>save it, if NO=> send a "No info" string. Then 2), to see all elements and split them by a comma so as to end up having an array of a lot of separeted strings.
//*eliminate all the repeated words from the array and save all strings as arrays
//*create a temperament in Temperament model for each array found on the info beforementioned
//*finally bring all the information stored on my DB.


const gettingAlltempsfromApi = async()=>{
    const allData = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
);
    try {
    let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
    if (el) {
        Temperament.findOrCreate({
        where: { name: el },
        });
    }
    });
    eachTemperament = await Temperament.findAll({attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
});
    return eachTemperament;
} catch (error) {
    throw new Error(error = error.message);
}
}

module.exports= {gettingAlltempsfromApi};
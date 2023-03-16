//In this file, I created all the controllers I will use on my dog handlers.
//It is a file which will control the logics on my dogs route.

require('dotenv').config();
const axios = require ("axios");
const {Dog}= require ("../db");
const {Temperament}= require ("../db");
const {API_KEY} = process.env

//This function will bring all the info (.data) from the Api which I need to have. Same info criteria I used to create dogs

const getBreedsFromApi= async()=> {
    let apiData= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let fromApi= await apiData.data.map((inst)=>{
        return {
        id: inst.id,
        weight: inst.weight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image.url,
        temperament: inst.temperament
        }
    });
    return fromApi;
}

//This function will bring all all de data from the Db;

const getBreedsFromDb= async()=> {
    let dbData= await Dog.findAll({
    include: {
        model: Temperament,
        attributes: ["name"],
        through:{attributes: [],},
       },
    });

    let fromDb= dbData.map((inst)=>{
        return {
        id: inst.id,
        weight: inst.weight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image,
        temperament: inst.temperament?inst.temperament.map(el=> el.name).join(", "):["Happy"]
        }
    });
    return fromDb;
};

//Unify in one function what comes from the api and what comes from db

const getBreeds= async() => {
    let breedsApi= await getBreedsFromApi();
    let breedsDb= await getBreedsFromDb();
    let breeds= breedsApi.concat(breedsDb);
    return breeds;
}

//This function will bring only the info related with the requested name. If the name does not exist, it will throw an error

const getBreedsByName= async (name)=>{
    
    let name2= name.toLowerCase();
    let breeds = await getBreeds();
    let result= breeds.filter((inst)=> inst.name.toLowerCase().includes(name2));
        
    if(result.length){
        return result
    }
    else {
        throw new Error("This breed does not exist")
    }
};

//This function will bring only the info belonging to the requested id. If the id does not exist, it will throw an error

const getBreedById= async (id)=> {
    console.log(id)
    console.log(isNaN(id))
    if(!isNaN(id)){
        let result= await axios(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)
        console.log(result)
        if(!Object.keys(result.data).length){
            throw new Error (`The Dog with id ${id} does not exist`)
        }
        return result.data
    }
    else {
        let result= await Dog.findByPk(id)
        if(!Object.keys(result).length){
            throw new Error (`The Dog with id ${id} does not exist`)
        }
        return result
    }
};

//This function will create a new dog in my Db with all the requested info.

const createNewDog= async (weight, height, name, life_span, image, temperament)=> {
    if (!weight || !height || !name || !life_span || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            weight,
            height,
            name,
            life_span,
            image,
        })
        let temper= await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
};

module.exports= {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}